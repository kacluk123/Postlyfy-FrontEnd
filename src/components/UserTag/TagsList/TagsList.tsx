import * as React from "react";
import * as Styled from "./TagsListStyles";
import Loader from '../../Common/Loader'
import moment from 'moment';
import { UIResponseTags } from "../../../api/endpoints/tags/tagsTypes";
import { isApiResonseHasError } from "../../../api/endpoints/common/errorDataUnpacker";
import { getTags } from "../../../api/endpoints/tags/tags";
import Button from '../../Common/Button';
import StandardInput from '../../Common/StandardInput';
import { useHistory } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const dates = [
  {date: '1 day', title: '1 day'},
  {date: '2 days', title: '1 days'},
]

const TagsList = () => {
  const [tags, setTags] = React.useState<UIResponseTags>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [searchTagValue, setSearchTagValue] = React.useState<string>("");
  const [activeTags, setActiveTags] = React.useState<string>("")
  const history = useHistory();

  React.useEffect(() => {
    (async function fetchTags() {
      setLoading(true);
      const yesterday = moment().subtract(1, 'days').toString();
      try {
        const tags = await getTags(yesterday);
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
            <Styled.MostActive>
            <Styled.TagsText>
              Most active tags from 24h
            </Styled.TagsText>
            <Autocomplete
              id="combo-box-demo"
              options={dates}
              value={activeTags}
              onChange={(event, value) => {
                setActiveTags(value.date)
              }}
              getOptionLabel={option => option.date}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField {...params} label="Combo box" variant="outlined" fullWidth />
              )}
            />
            </Styled.MostActive>
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
