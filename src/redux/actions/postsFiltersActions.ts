export enum POSTS_FILTER_NAMES {
  CHANGE_SORTING = "CHANGE_SORTING",
}

export interface IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES;
}

export interface IPostsFiltersChangeSorting extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.CHANGE_SORTING;
  sort: string;
}

export type postsFilterActions = IPostsFiltersChangeSorting;

export function changeSorting(sort: string): IPostsFiltersChangeSorting {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_SORTING,
    sort,
  };
};