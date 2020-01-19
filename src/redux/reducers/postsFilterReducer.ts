import { postsFilterActions, POSTS_FILTER_NAMES } from '../actions/postsFiltersActions';
import { AppState } from '../store';
import { createSelector } from 'reselect'; 

type logicalSortingOperator = "$gt";

export interface ISingleMatch {
  [k: string]: string | {
    [k in logicalSortingOperator]: string;
  };
};

type matchOperators = "$or" | "$and";

export type matchWithOperator = {
  [k in matchOperators]: ISingleMatch[]
};

interface InitialStateType {
  readonly sortingType: string;
  readonly sort: null | string[];
  readonly match: matchWithOperator | ISingleMatch | null;
}

const initialState: InitialStateType = {
  sort: null,
  match: null,
  sortingType: 'Newest'
};

export function postFiltersReducer(
  state: InitialStateType = initialState,
  action: postsFilterActions
) {
  switch (action.type) {
    case POSTS_FILTER_NAMES.CHANGE_SORTING: {
      return {
        ...state,
        sort: action.sorting.sort,
        sortingType: action.sorting.sortingType
      };
    }

    case POSTS_FILTER_NAMES.CHANGE_ALL_SORTING: {
      return {
        ...action.sorting
      };
    }

    default: {
      return state;
    }
  }
}

export const getMatch = (state: AppState) => state.postFiltersReducer.match;
export const getSort = (state: AppState) => state.postFiltersReducer.sort;
export const getSortingType = (state: AppState) => state.postFiltersReducer.sortingType;

export const getSorting = createSelector(
  [ getMatch, getSort ],
  (match: InitialStateType['match'], sort: InitialStateType['sort']): {
    match?: matchWithOperator | ISingleMatch
    sort?: string[]
  } => ({
    ...(match ? { match } : {}),
    ...(sort ? { sort } : {}),
  })
);