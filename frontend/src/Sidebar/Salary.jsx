import React from "react";
import Button from "./Button";
import InputField from "../components/InputField";

const Salary = ({ handleCategoryChange, handleButtonClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div className="flex mb-4">
        <Button onClickHandler={handleButtonClick} value="" title="Hourly" />
        <Button
          onClickHandler={handleButtonClick}
          value="Monthly"
          title="Monthly"
        />
        <Button
          onClickHandler={handleButtonClick}
          value="Yearly"
          title="Yearly"
        />
      </div>

      <label className="sidebar-label-container">
        <input
          type="radio"
          name="test2"
          id="test"
          value=""
          onChange={handleCategoryChange}
        />
        <span className="checkmark"></span>All
      </label>

      <InputField
        handleCategoryChange={handleCategoryChange}
        value={30}
        title="< 30k"
        name="test2"
      />

      <InputField
        handleCategoryChange={handleCategoryChange}
        value={50}
        title="< 50k"
        name="test2"
      />

      <InputField
        handleCategoryChange={handleCategoryChange}
        value={80}
        title="< 80k"
        name="test2"
      />

      <InputField
        handleCategoryChange={handleCategoryChange}
        value={100}
        title="< 100k"
        name="test2"
      />
    </div>
  );
};

export default Salary;
