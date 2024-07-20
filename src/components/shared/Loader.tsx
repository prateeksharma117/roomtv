import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
  return (
    <div className=" flex-center h-screen w-full">
      <FadeLoader color="#0e78f9" speedMultiplier={3} />
    </div>
  );
};

export default Loader;
