import { get } from '../../api';

export const getTags = async (): Promise<string[]> => {
  const response = await get<{ tags: string[] }>('/tags');
  return response.tags;
};
