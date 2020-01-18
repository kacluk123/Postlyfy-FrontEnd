import * as React from 'react';
import * as Styled from './PostsFiltersStyles';
import * as Types from './PostsFiltersTypes';
import SinglePostFilter from './SinglePostFilter';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { useDispatch } from 'react-redux';
import { changeSorting } from '../../../../redux/actions/postsFiltersActions';

const PostsFilters = ({}: Types.IPostsFilters) => {
  const dispatch = useDispatch();

  return (
    <Styled.PostsFilters>
      <SinglePostFilter 
        icon={<NewReleasesIcon
          color='disabled'
        />}
        filterText='Newest'
        onFilterClick={() => { dispatch(changeSorting('-likesCount')); }}
      />
    </Styled.PostsFilters>
  );
};

export default PostsFilters;