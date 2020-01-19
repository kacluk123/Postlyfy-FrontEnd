import * as React from 'react';
import * as Styled from './PostsFiltersStyles';
import * as Types from './PostsFiltersTypes';
import SinglePostFilter from './SinglePostFilter';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssistantIcon from '@material-ui/icons/Assistant';
import { useDispatch, useSelector } from 'react-redux';
import { changeSorting, } from '../../../../redux/actions/postsFiltersActions';
import { getSortingType } from '../../../../redux/reducers/postsFilterReducer';

const PostsFilters = ({}: Types.IPostsFilters) => {
  const dispatch = useDispatch();
  const sortingType = useSelector(getSortingType);

  return (
    <Styled.PostsFilters>
      <SinglePostFilter 
        icon={<NewReleasesIcon
          color='disabled'
        />}
        filterText='Newest'
        isFilterActive= {sortingType === 'newest'}
        onFilterClick={() => { dispatch(changeSorting({
          sort: ['-addedAt'],
          sortingType: 'newest'
        })); }}
      />
      <SinglePostFilter 
        icon={<AssistantIcon
          color='disabled'
        />}
        filterText='Oldest'
        isFilterActive= {sortingType === 'oldest'}
        onFilterClick={() => { dispatch(changeSorting({
          sort: ['addedAt'],
          sortingType: 'oldest'
        })); }}
      />
      <SinglePostFilter 
        icon={<FavoriteIcon
          color='disabled'
        />}
        filterText='Most liked'
        onFilterClick={() => { dispatch(changeSorting({
          sort: ['-likesCount'],
          sortingType: 'mostLiked'
        })); }}
        isFilterActive= {sortingType === 'mostLiked'}

      />
    </Styled.PostsFilters>
  );
};

export default PostsFilters;