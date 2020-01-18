import { ISingleMatch, matchWithOperator } from '../reducers/postsFilterReducer'

export enum POSTS_FILTER_NAMES {
  CHANGE_SORTING = "CHANGE_SORTING",
  CHANGE_ALL_SORTING = "CHANGE_ALL_SORTING"
}

export interface IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES;
}

export interface IPostsFiltersChangeSorting extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.CHANGE_SORTING;
  sort: string;
}

export interface IPostsFiltersChangeAllSorting extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.CHANGE_ALL_SORTING;
  sorting: {
    sort: string[]
    match: matchWithOperator | ISingleMatch
  },
}

export type postsFilterActions = IPostsFiltersChangeSorting | IPostsFiltersChangeAllSorting;

export function changeSorting(sort: string): IPostsFiltersChangeSorting {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_SORTING,
    sort,
  };
};

export function changeAllSorting(sorting: {
  sort: string[]
  match: matchWithOperator | ISingleMatch
}): IPostsFiltersChangeAllSorting {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_ALL_SORTING,
    sorting,
  };
};