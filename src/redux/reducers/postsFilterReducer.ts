import { postsFilterActions, POSTS_FILTER_NAMES } from '../actions/postsFiltersActions';
import { AppState } from '../store';

type logicalSortingOperator = "$gt";

interface ISingleMatch {
  [k: string]: string | {
    [k in logicalSortingOperator]: string;
  };
}

type matchOperators = "$or" | "$and";

type matchWithOperator = {
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
        sort: action.sort;
      };
    }

    default: {
      return state;
    }
  }
};