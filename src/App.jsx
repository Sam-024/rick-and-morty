import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./helpers/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";

function App() {
  const [locationID, setLocationId] = useState(getRandomNumber(126));
  const url = `https://rickandmortyapi.com/api/location/${locationID}`;
  const [location, getLocation, messageError, isLoading] = useFetch(url);

  useEffect(() => {
    getLocation(url);
  }, [locationID]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputID.current.value) {
      setLocationId(inputID.current.value.trim());
    }
  };
  const inputID = useRef();

  return (
    <div className="app flex-container">
      <header className="app__hero">
        <img className="hero__image" src="/image/hero.png" alt="Hero Image" />
      </header>

      <section className="app__body">
        <form className="form" onSubmit={handleSubmit}>
          <input className="form__input" type="number" ref={inputID} min={1} />

          <button className="form__btn">Search</button>
        </form>

        {isLoading ? (
          <h1>Loading..</h1>
        ) : messageError ? (
          <h1>❌Sorry! You must enter numbers from 1 to 126</h1>
        ) : (
          <>
            <LocationInfo location={location} />

            <section className="cards__container flex-container">
              {location?.residents?.map((url) => (
                <ResidentCard key={url} url={url} />
              ))}
            </section>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
