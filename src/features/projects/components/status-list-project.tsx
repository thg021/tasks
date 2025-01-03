'use client';
import { useEffect, useState } from 'react';
import { clone, map } from 'lodash';
import { Grip, PencilIcon, TrashIcon } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type Status = {
  id: string;
  name: string;
  projectId: string;
  color: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
};

type PositionStatus = {
  id: string;
  position: number;
  positionOriginal: number;
};

type StatusListProjectProps = {
  items: Status[];
  onReorder: (updateData: PositionStatus[]) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export const StatusListProject = ({
  items,
  onReorder,
  onDelete,
  onEdit
}: StatusListProjectProps) => {
  const [status, setStatus] = useState(items);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setStatus(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedList = clone(status); //clone é equivalente ao Array.from(status)

    const [movedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, movedItem);

    const bulkUpdateData = map(updatedList, (item, index) => ({
      id: item.id,
      position: index,
      positionOriginal: item.position
    }));

    onReorder(bulkUpdateData);
    setStatus(updatedList);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="status">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {map(status, (item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="mb-4 flex items-center gap-x-2 rounded-md border border-gray-200 bg-slate-200 text-sm text-gray-700"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className="rounded-l-md border-r border-r-gray-200 px-2 py-3 transition hover:bg-gray-300"
                      {...provided.dragHandleProps}
                    >
                      <Grip className="size-5" />
                    </div>

                    {item.color && (
                      <span
                        className="mr-2 inline-block size-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                    {item.name}
                    <div className="ml-auto flex items-center gap-x-4 pr-2">
                      <PencilIcon
                        onClick={() => {
                          onEdit(item.id);
                        }}
                        className="size-4 cursor-pointer transition hover:opacity-75"
                      />
                      <TrashIcon
                        onClick={() => {
                          onDelete(item.id);
                        }}
                        className="size-4 cursor-pointer transition hover:opacity-75"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
