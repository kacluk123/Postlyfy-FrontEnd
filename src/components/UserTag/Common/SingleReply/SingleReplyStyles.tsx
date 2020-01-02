import styled, { css } from "styled-components";
import { REPLY_TYPE } from "./SingleReplyTypes";

const getGridAreas = (type: string) => {
  const gridAreas = {
    [REPLY_TYPE.POST]: css`
      grid-template-areas:
        "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate SingleReplyLikeButton"
        "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent SingleReplyLikeButton"
        "SingleReplyUserAvatar SingleReplyActions SingleReplyActions SingleReplyActions SingleReplyLikeButton"
        "SingleReplyUserAvatar Comments Comments Comments SingleReplyLikeButton";

      @media (max-width: 500px) {
        & {
          grid-template-areas:
            "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate"
            "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent"
            "SingleReplyUserAvatar SingleReplyActions SingleReplyActions SingleReplyActions"
            "Comments Comments Comments Comments";
        }

      };
    `,
    [REPLY_TYPE.DEFAULT]: css`
      grid-template-areas:
        "SingleReplyUserAvatar SingleReplyUserName SingleReplyDate SingleReplyDate SingleReplyLikeButton"
        "SingleReplyUserAvatar SingleReplyContent SingleReplyContent SingleReplyContent SingleReplyLikeButton";
    `
  };

  return gridAreas[type];
};

export const SingleReply = styled.div.attrs({
  className: "SingleReply"
})<{ type: string }>`
  @keyframes slide-fwd-bottom {
    0% {
      opacity: 0;
      transform: translateY(0px);
    }
    100% {
      opacity: 1;
      transform: translateY(10px);
    }
  }
  animation: slide-fwd-bottom 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  width: 100%;
  padding: 10px 20px 10px 20px;
  background: #edecea;
  border-radius: 2px;
  display: grid;
  min-height: 140px;
  grid-template-columns: 70px max-content 10% 1fr 1fr;
  grid-template-rows: max-content;
  grid-row-gap: 10px;
  ${(props: { type: string }) => getGridAreas(props.type)}
  ${(props: { type: string }) => props.type === REPLY_TYPE.DEFAULT && css`
    @media (max-width: 500px) {
      grid-template-columns: 50px max-content 10% 1fr;
    }
  `}
`;

export const SingleReplyUserAvatarContainer = styled.div.attrs({
  className: "SingleReplyUserAvatarContainer"
})`
  grid-area: SingleReplyUserAvatar;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props: { type: string }) => props.type === REPLY_TYPE.DEFAULT && css`
    @media (max-width: 500px) {
      width: 35px;
      height: 35px;
    }
  `}
`;

export const SingleReplyUserAvatar = styled.img.attrs({
  className: "SingleReplyUserAvatar"
})`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
`;

export const SingleReplyLikeButton = styled.div.attrs({
  className: "SingleReplyLikeButton"
})`
  grid-area: SingleReplyLikeButton;
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
