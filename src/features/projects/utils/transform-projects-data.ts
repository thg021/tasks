// src/services/projects.ts
import { uniqBy, flatMap, map, pick, get } from 'lodash';
import type { Project } from '../server/types/project-response';
import type { TransformProjectResponse } from '../server/types/transform-project-response';

export const transformProjectsData = (projectResponse: Project[]): TransformProjectResponse => {
  const workspace = uniqBy(
    map(projectResponse, (item) => pick(item.workspace, ['id', 'name', 'imageUrl'])),
    'id'
  );

  const member = uniqBy(
    flatMap(projectResponse, (item) =>
      get(item, 'workspace.members', []).map((member) => ({
        id: member.id,
        userId: member.userId,
        name: member.user.name || '',
        email: member.user.email,
        role: member.role
      }))
    ),
    'id'
  );

  const project = map(projectResponse, (item) => ({
    id: item.id,
    name: item.name
  }));

  return { project, workspace, member };
};
