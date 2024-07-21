// import React, { useState, useEffect } from "react";
// import Banner from "../components/Banner";
// import Card from "../components/Card";
// import Jobs from "./Jobs";
// import Sidebar from "../Sidebar/Sidebar";
// import Newsletter from "../components/Newsletter";

// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [isloading, setIsloading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     setIsloading(true);
//     fetch(`http://localhost:5000/all-jobs`)
//       .then((res) => res.json())
//       .then((data) => {
//         // console.log(data);
//         setJobs(data);
//         setIsloading(false);
//       });
//   }, []);
//   console.log(jobs);

//   // handle input changes
//   const [query, setQuery] = useState("");
//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   // filter jobs by title
//   const filteredItems = jobs.filter(
//     (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
//   );
//   console.log(filteredItems);

//   // Radio Filtering
//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   // Button Filtering
//   const handleButtonClick = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   //calculate the index range
//   const calculatePageRange = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return { startIndex, endIndex };
//   };

//   // function for next page
//   const nextPage = () => {
//     if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // function for previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const filteredData = (jobs, selected, query) => {
//     let filteredJobs = jobs;

//     // filtering input items
//     if (query) {
//       filteredJobs = filteredItems;
//     }

//     // category filtering
//     if (selected) {
//       filteredJobs = filteredJobs.filter(
//         ({
//           jobLocation,
//           maxPrice,
//           experienceLevel,
//           salaryType,
//           employmentType,
//         }) =>
//           jobLocation.toLowerCase() === selected.toLowerCase() ||
//           parseInt(maxPrice) <= parseInt(selected) ||
//           salaryType.toLowerCase() === selected.toLowerCase() ||
//           experienceLevel.toLowerCase() === selected.toLowerCase() ||
//           employmentType.toLowerCase() === selected.toLowerCase()
//       );
//       console.log(filteredJobs);
//     }

//     // Additional check for postingDate
//     if (selected && !isNaN(Date.parse(selected))) {
//       filteredJobs = filteredJobs.filter(({ postingDate }) => {
//         return new Date(postingDate) >= new Date(selected);
//       });
//     }

//     // slice the data based on the current page
//     const { startIndex, endIndex } = calculatePageRange();
//     filteredJobs = filteredJobs.slice(startIndex, endIndex);
//     return filteredJobs.map((data, index) => <Card key={index} data={data} />);
//   };

//   const result = filteredData(jobs, selectedCategory, query);

//   return (
//     <div>
//       <Banner query={query} handleInputChange={handleInputChange} />
//       <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-4 py-12">
//         {/* Left Side */}
//         <div className="bg-white p-4 rounded">
//           <Sidebar
//             handleCategoryChange={handleCategoryChange}
//             handleButtonClick={handleButtonClick}
//           />
//         </div>

//         {/* Job Cards */}
//         <div className="col-span-2 bg-white p-4 rounded-sm">
//           {isloading ? (
//             <p>Loading....</p>
//           ) : result.length > 0 ? (
//             <Jobs result={result} />
//           ) : (
//             <>
//               <h3 className="ml-2">{result.length} Jobs Found</h3>
//               <p>Try changing your search criteria</p>
//             </>
//           )}
//           {/* Pagination Here */}
//           {result.length > 0 ? (
//             <div className="flex justify-center mt-4 space-x-8">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className="hover:underline cursor-pointer"
//               >
//                 Previous
//               </button>
//               <span>
//                 Page {currentPage} of{" "}
//                 {Math.ceil(filteredItems.length / itemsPerPage)}
//               </span>
//               <button
//                 onClick={nextPage}
//                 disabled={
//                   currentPage === Math.ceil(filteredItems.length / itemsPerPage)
//                 }
//                 className="hover:underline cursor-pointer"
//               >
//                 Next
//               </button>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>

//         {/* Right Side */}
//         <div className="bg-white p-4 rounded">
//           <Newsletter />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Sidebar from "../Sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import Jobs from "./Jobs";
import Card from "../components/Card";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(query);
    setSearchLocation(location);
  };

  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/all-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleButtonClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filter by job title by typing
    // if (query) {
    //   filteredJobs = jobs.filter(
    //     (job) =>
    //       job.jobTitle &&
    //       job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
    //   );
    // }

    // Filter by job title by clicking on search button
    if (searchQuery) {
      filteredJobs = jobs.filter(
        (job) =>
          job.jobTitle &&
          job.jobTitle.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    }

    // Filter by selected category (if any)
    if (selected) {
      filteredJobs = filteredJobs.filter((job) => {
        const {
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        } = job;

        return (
          (jobLocation &&
            jobLocation.toLowerCase() === selected.toLowerCase()) ||
          (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
          (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
          (experienceLevel &&
            experienceLevel.toLowerCase() === selected.toLowerCase()) ||
          (employmentType &&
            employmentType.toLowerCase() === selected.toLowerCase()) ||
          (postingDate &&
            new Date(postingDate).toDateString() ===
              new Date(selected).toDateString())
        );
      });
    }

    // Filter by location by typing
    // if (location) {
    //   filteredJobs = filteredJobs.filter(
    //     (job) =>
    //       job.jobLocation &&
    //       job.jobLocation.toLowerCase().indexOf(location.toLowerCase()) !== -1
    //   );
    // }

    // Filter by location by clicking on submit button
    if (searchLocation) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.jobLocation &&
          job.jobLocation
            .toLowerCase()
            .indexOf(searchLocation.toLowerCase()) !== -1
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, index) => <Card key={index} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        handleLocationChange={handleLocationChange}
        handleSearch={handleSearch}
      />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar
            handleCategoryChange={handleCategoryChange}
            handleButtonClick={handleButtonClick}
          />
        </div>

        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p>Loading....</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="ml-2">0 Jobs Found</h3>
              <p>Try changing your search criteria</p>
            </>
          )}
          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline cursor-pointer"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(result.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(result.length / itemsPerPage)
                }
                className="hover:underline cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
