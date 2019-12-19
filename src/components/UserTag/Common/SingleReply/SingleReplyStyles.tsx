import styled, { css } from "styled-components";
import { REPLY_TYPE } from "./SingleReplyTypes";

const getGridAreas = (type: string) => {
  const gridAreas = {
    [REPLY_TYPE.POST]: css`
      grid-template-areas:
        "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate"
        "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent"
        "SingleReplyUserAvatar SingleReplyActions SingleReplyActions SingleReplyActions"
        "SingleReplyUserAvatar Comments Comments Comments";
    `,
    [REPLY_TYPE.DEFAULT]: css`
      grid-template-areas:
        "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate"
        "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent";
    `
  };

  return gridAreas[type];
};

export const SingleReply = styled.div.attrs({
  className: "SingleReply"
})<{ type: string }>`
  width: 100%;
  min-height: 140px;
  padding: 10px 20px 10px 20px;
  background: #edecea;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 10% max-content 10% 1fr;
  grid-template-rows: max-content;
  grid-row-gap: 10px;
  ${(props: { type: string }) => getGridAreas(props.type)}
`;

export const SingleReplyUserAvatar = styled.div.attrs({
  className: "SingleReplyUserAvatar"
})`
  grid-area: SingleReplyUserAvatar;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SingleReplyDate = styled.div.attrs({
  className: "SingleReplyDate"
})`
  grid-area: SingleReplyDate;
  font-size: 12px;
  font-weight: 400;
  color: var(--medium-grey);
  padding: 3px 0 0 10px;
  border-bottom: 1px solid var(--tiny-grey);
`;

export const SingleReplyContent = styled.div.attrs({
  className: "SingleReplyContent"
})`
  grid-area: SingleReplyContent;
  word-break: break-all;
`;

export const SingleReplyUserName = styled.div.attrs({
  className: "SingleReplyUserName"
})`
  grid-area: SingleReplyUserName;
  color: var(--red-orange);
  font-weight: 400;
  border-bottom: 1px solid var(--tiny-grey);
`;
