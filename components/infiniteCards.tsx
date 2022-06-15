import InfiniteScroll from "react-infinite-scroll-component";
import { IData } from "../lib/countries";
import Card from "../components/card";
import { useEffect, useState } from "react";

interface IProps {
  filteredCountries: IData[];
}

const countriesPerPage = 20;

const InfiniteCards = ({ filteredCountries }: IProps) => {
  const [showedCountries, setShowedCountries] = useState<IData[]>(filteredCountries.slice(0, countriesPerPage));
  const [next, setNext] = useState<number>(countriesPerPage);
  console.log(filteredCountries, "filtere");

  useEffect(() => {
    setShowedCountries(filteredCountries.slice(0, next + countriesPerPage));
  }, [filteredCountries, next]);

  const loopWithSlice = (start: number, end: number) => {
    const slicedCountries = filteredCountries.slice(start, end);
    const newShowedCountries = [...showedCountries, ...slicedCountries];
    setShowedCountries(newShowedCountries);
    console.log(newShowedCountries, "newshowed");
  };

  const loadMore = () => {
    loopWithSlice(next, next + countriesPerPage);
    setNext(next + countriesPerPage);
  };

  return (
    <InfiniteScroll
      dataLength={showedCountries.length}
      next={loadMore}
      hasMore={filteredCountries.length > showedCountries.length}
      loader={<div className="p-10">Loading...</div>}
      style={{ overflow: "none" }}
      className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      justify-items-center md:gap-20"
    >
      {showedCountries.map((country, index) => {
        return <Card key={index} country={country} />;
      })}
    </InfiniteScroll>
  );
};

export default InfiniteCards;
