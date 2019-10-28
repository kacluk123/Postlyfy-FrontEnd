import * as React from "react";
import * as Styled from "./StandardTextAreaStyles";
import * as Types from "./StandardTextAreaTypes";

const StandardTextArea = ({ ...props }: Types.StandardTextArea) => {
  return <Styled.StandardTextArea {...props} />;
};

export default React.memo(StandardTextArea);
