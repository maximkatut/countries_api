import InfiniteScroll from "react-infinite-scroll-component";
import { IData } from "../lib/countries";
import Card from "../components/card";
import { useLayoutEffect, useRef, useState } from "react";

interface IProps {
  filteredCountries: IData[];
}

const countriesPerPage = 20;

const InfiniteCards = ({ filteredCountries }: IProps) => {
  const [showedCountries, setShowedCountries] = useState<IData[]>(filteredCountries.slice(0, countriesPerPage));
  const [next, setNext] = useState<number>(countriesPerPage);
  const firstUpdate = useRef<boolean>(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setShowedCountries(filteredCountries.slice(0, next + countriesPerPage));
  }, [filteredCountries, next]);

  const loopWithSlice = (start: number, end: number) => {
    const slicedCountries = filteredCountries.slice(start, end);
    const newShowedCountries = [...showedCountries, ...slicedCountries];
    setShowedCountries(newShowedCountries);
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
      style={{ overflow: "visible" }}
    >
      <ul
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      justify-items-center md:gap-20"
      >
        {showedCountries.length === 0 && <li className="p-20 bg-white dark:bg-dark-blue">No results...</li>}
        {showedCountries.map((country, index) => {
          return <Card key={index} country={country} />;
        })}
      </ul>
    </InfiniteScroll>
  );
};

export default InfiniteCards;
