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
    const isMaxScroll = !(
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    );

    const increseCurrentOffset = () =>
      (itemsOffset.current = itemsOffset.current + limit);

    if (isMaxScroll) {
      increseCurrentOffset();
      callback({ limit, offset: itemsOffset.current, ...additionalParams });
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useWindowScroll;
