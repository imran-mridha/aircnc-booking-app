import React, { useEffect, useState } from "react";
import ExpCard from "../Components/Card/ExpCard";
import HomeCard from "../Components/Card/HomeCard";
import SearchForm from "../Components/Form/SearchForm";
import Spinner from "../Components/Spinner/Spinner";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allExp, setAllExp] = useState([]);

  useEffect(() => {
    fetch("expdata.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllExp(data);
      });
  }, []);

  return (
    <div className="md:flex justify-center gap-10 px-6 md:px-10">
      <div className="mt-10">
        <SearchForm />
      </div>
      <div className="flex-1">
      <div className="mt-10">
          <div className="flex justify-between text-xl font-bold">
            <p className="">Homes</p>
            <p>See All</p>
          </div>
          <div className="flex justify-between flex-wrap">
            {[...Array(3)].map((_, idx) => (
              <HomeCard key={idx} />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-between text-xl font-bold">
            <p className="">Experience</p>
            <p>See All</p>
          </div>
          <div className="flex justify-between flex-wrap">
            {allExp.slice(0, 4).map((exp, idx) => (
              <ExpCard key={idx} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
