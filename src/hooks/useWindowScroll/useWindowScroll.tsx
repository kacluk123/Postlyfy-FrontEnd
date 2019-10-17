import * as React from "react";
import { UseWindowScrollParams } from "./useWindowScrollTypes";

const useWindowScroll = ({
  offset,
  limit,
  callback,
  additionalParams
}: UseWindowScrollParams) => {
  const itemsOffset = React.useRef(offset);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    const increseCurrentOffset = () =>
      (itemsOffset.current = itemsOffset.current + limit);
    increseCurrentOffset();
    callback({ limit, offset: itemsOffset.current });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useWindowScroll;
