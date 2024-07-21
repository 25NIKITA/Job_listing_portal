import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => {
        setSalary(data);
        setFilteredSalary(data);
      });
  }, [searchText]);

  const handleSearch = () => {
    if (searchText === "") {
      setFilteredSalary(salary);
    } else {
      const filter = salary.filter((job) =>
        job.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredSalary(filter);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Estimate Salary"} path={"Salary"} />
      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>
      </div>

      {/** Salary display Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSalary.length > 0 ? (
          filteredSalary.map((data) => (
            <div key={data.id} className="mb-4 p-4 border rounded shadow">
              <h4 className="font-bold">{data.title}</h4>
              <p>Salary: {data.salary}</p>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default SalaryPage;
