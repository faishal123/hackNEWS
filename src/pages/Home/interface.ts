import { Dispatch, SetStateAction } from "react";

export type fetchTopStoriesFunctionType = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  page: number | string
) => Promise<{
  data?: GetTopStoriesResponse;
  error?: unknown;
}>;

export type DataFromLocalStorageType = {
  byName: { id: number; title: string }[];
  arrayIds: number[];
};

export type StoryType = {
  id?: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};

export type IdsToGetType = number[];

export type GetTopStoriesResponse = {
  [key: string]: number;
};

export type UseFetchParam = {
  onCompleted: (data: GetTopStoriesResponse | number[]) => void;
  onError: (() => void) | ((e: Error) => void);
};

export type fetchMultipleStoriesType = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  ids: number[]
) => Promise<{ error?: unknown; data?: StoryType[] }>;
