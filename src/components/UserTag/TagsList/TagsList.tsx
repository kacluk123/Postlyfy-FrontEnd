import * as React from "react";
import * as Styled from "./TagsListStyles";
import Loader from '../../Common/Loader'
import { UIResponseTags } from "../../../api/endpoints/tags/tagsTypes";
import { isApiResonseHasError } from "../../../api/endpoints/common/errorDataUnpacker";
import { getTags } from "../../../api/endpoints/tags/tags";
import Button from '../../Common/Button';
import StandardInput from '../../Common/StandardInput';
import { useHistory } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";

const TagsList = () => {
  const [tags, setTags] = React.useState<UIResponseTags>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [searchTagValue, setSearchTagValue] = React.useState<string>("");
  const history = useHistory();

  React.useEffect(() => {
    (async function fetchTags() {
      setLoading(true);
      try {
        const tags = await getTags();

        if (isApiResonseHasError(tags)) {
          setTags(tags);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearchTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchTagValue(value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push("/posts/" + searchTagValue);
  };

  return (
    <Styled.TagsList>
      {isLoading
        ? <CircularProgress />
        : (
          <>
            <Styled.TagForm onSubmit={handleFormSubmit}>
              <StandardInput
                label='Search'
                value={searchTagValue}
                name='searchTag'
                onChange={handleSearchTag}
              />
              <Button type='submit'>Go to tag</Button>
            </Styled.TagForm>
            <Styled.TagsListElements>
              {tags?.tags.map(({ tagName, count }) => (
                <Styled.HashtagLink key={tagName} to={"/posts/" + tagName}>
                  {""} #{tagName}({count})
                </Styled.HashtagLink>
              ))}
            </Styled.TagsListElements>
          </>
      )}
    </Styled.TagsList>
  );
};

export default TagsList;
