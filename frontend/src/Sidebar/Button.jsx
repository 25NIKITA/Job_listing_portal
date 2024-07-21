import React from "react";

const Button = ({ onClickHandler, value, title }) => {
  return (
    <div>
      <button
        onClick={onClickHandler}
        value={value}
        className="border border-solid px-4 py-1 text-base hover:bg-blue-500 hover:text-white hover:cursor-pointer"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
