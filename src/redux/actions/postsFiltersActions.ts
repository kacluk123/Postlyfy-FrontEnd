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
  sorting: {
    sort: string[],
    sortingType: string,
  };
}

export interface IPostsFiltersChangeAllSorting extends IPostsFiltersBaseAction {
  type: POSTS_FILTER_NAMES.CHANGE_ALL_SORTING;
  sorting: {
    sort: string[]
    match: matchWithOperator | ISingleMatch
    sortingType: string;
  },
}

export type postsFilterActions = IPostsFiltersChangeSorting | IPostsFiltersChangeAllSorting;

export function changeSorting(sorting: {
  sort: string[],
  sortingType: string
}): IPostsFiltersChangeSorting {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_SORTING,
    sorting,
  };
};

export function changeAllSorting(sorting: {
  sort: string[]
  match: matchWithOperator | ISingleMatch
  sortingType: string
}): IPostsFiltersChangeAllSorting {
  return {
    type: POSTS_FILTER_NAMES.CHANGE_ALL_SORTING,
    sorting,
  };
};