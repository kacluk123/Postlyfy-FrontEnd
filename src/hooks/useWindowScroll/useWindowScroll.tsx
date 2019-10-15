import * as React from "react";

const useWindowScroll = (callback: () => void) => {
  const handleScroll = () => {
    const isMaxScroll =
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight;

    if (isMaxScroll) {
      callback();
    }
  };
  // const limit = document.body.offsetHeight - window.innerHeight;
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useWindowScroll;
