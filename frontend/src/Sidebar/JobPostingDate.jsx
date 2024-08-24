import React from "react";
import InputField from "../components/InputField";

const JobPostingDate = ({ handleCategoryChange }) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtydaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  //   convert date to string
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
  const thirtydaysAgoDate = thirtydaysAgo.toISOString().slice(0, 10);
  //   console.log(sevenDaysAgoDate);

  return (
    <div>
      <h4 className="text-lg font-medium mb-2 pl-4">Date of Posting</h4>
      <div className="pl-4">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test3"
            id="test"
            value=""
            onChange={handleCategoryChange}
          />
          <span className="checkmark"></span>All Time
        </label>

        <InputField
          handleCategoryChange={handleCategoryChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 Hours"
          name="test3"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value={sevenDaysAgoDate}
          title="Last 7 Days"
          name="test3"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value={thirtydaysAgoDate}
          title="Last Month"
          name="test3"
        />
      </div>
    </div>
  );
};

export default JobPostingDate;
