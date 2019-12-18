import * as React from "react";
import * as Styled from "./TagsListStyles";
import Loader from '../../Common/Loader'
import { UIResponseTags } from "../../../api/endpoints/tags/tagsTypes";
import { isApiResonseHasError } from "../../../api/endpoints/common/errorDataUnpacker";
import { getTags } from "../../../api/endpoints/tags/tags";

const TagsList = () => {
  const [tags, setTags] = React.useState<UIResponseTags>();
  const [isLoading, setLoading] = React.useState<boolean>(false);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.TagsList>{tags?.tags.map(({ tagName, count }) => (
      <Styled.HashtagLink key={tagName} to={"/posts/" + tagName}>
        {""} #{tagName}({count})
      </Styled.HashtagLink>
      ))}
    </Styled.TagsList>
  );
};

export default TagsList;
