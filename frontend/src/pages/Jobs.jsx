import React from "react";

const Jobs = ({ result }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2 ml-2">
          {result.length} Jobs Found
        </h3>
      </div>
      <section className="job-cards-container">{result}</section>
    </>
  );
};

export default Jobs;
