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
  readonly sort: null | string[];
  readonly match: matchWithOperator | ISingleMatch | null;
}

const initialState: InitialStateType = {
  sort: null,
  match: null,
};

export function postFiltersReducer(
  state: InitialStateType = initialState,
  action: postsFilterActions
) {
  switch (action.type) {
    case POSTS_FILTER_NAMES.CHANGE_SORTING: {
      return {
        ...state,
        sort: action.sort,
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

export const getSorting = createSelector(
  [ getMatch, getSort ],
  (match: InitialStateType['match'], sort: InitialStateType['sort']) => ({
    ...(match ? { match } : {}),
    ...(sort ? { sort } : {}),
  })
)