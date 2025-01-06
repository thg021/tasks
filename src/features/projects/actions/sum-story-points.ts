import { db } from '@/lib/db.prisma';

type GetCurrentSpritProps = {
  projectId: string;
};

export const sumStoryPoints = async ({ projectId }: GetCurrentSpritProps) => {
  try {
    const totalStoryPoints = await db.task.aggregate({
      where: {
        projectId
      },
      _sum: {
        storyPoints: true // Coluna a ser somada
      }
    });
    return totalStoryPoints._sum.storyPoints || 0;
  } catch (error) {
    console.error(error);
    throw new Error('Error to get project');
  }
};
