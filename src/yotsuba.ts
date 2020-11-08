import axios from 'axios';

interface CatalogPage {
  threads: Post[];
}

interface Thread {
  posts: Post[];
}

export interface Post {
  no: number;
  name?: string;
  time: number;
  trip?: string;
  sub?: string;
  com?: string;
}

export const getCatalog = async (board: string) => {
  const response = await axios.get<CatalogPage[]>(`https://a.4cdn.org/${board}/catalog.json`);

  return response.data.flatMap((page) => page.threads);
};

export const getThread = async (board: string, postNumber: number) => {
  const response = await axios.get<Thread>(`https://a.4cdn.org/${board}/thread/${postNumber}.json`);

  return response.data.posts;
};
