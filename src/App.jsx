import { useEffect, useState } from "react";
import {
  Logo,
  Box,
  ErrorMessage,
  Loader,
  Main,
  Movielist,
  Navbar,
  NumResult,
  Search,
  SelectedMovie,
  WatchedList,
  WatchedSummary,
} from "./Components/index";
import useLocalStorageState from "./Components/UseLocalStorageState";

const key = "e12869ee";
export default function App() {
  const [movies, setMovies] = useState([]);

  const [IsLoading, SetIsLoading] = useState(false);
  const [error, seterror] = useState();
  const [query, setQuery] = useState("");
  const [selectedtitle, setselectedtitle] = useState();
  const [watched, setWatched] = useLocalStorageState([], "watched");
  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchMovies() {
        try {
          SetIsLoading(true);
          seterror("");
          const res = await fetch(
            `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          seterror("");
        } catch (err) {
          if (err.name !== "AbortError") seterror(err.message);
        } finally {
          SetIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        seterror("");
        return;
      }
      FetchMovies();
      handleclosedmovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  const onAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handleselectmovie = (title) => {
    setselectedtitle((selectedtitle) =>
      title === selectedtitle ? null : title
    );
  };
  const handleclosedmovie = () => {
    setselectedtitle(null);
  };
  function handleDeleteWatched(title) {
    setWatched((watched) => watched.filter((movie) => movie.title !== title));
  }
  return (
    <>
      <Navbar>
        <Logo />
        <Search Query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {IsLoading && <Loader />}
          {!IsLoading && !error && (
            <Movielist movies={movies} onselectmovie={handleselectmovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedtitle ? (
            <SelectedMovie
              SelectedTitle={selectedtitle}
              onclosemovie={handleclosedmovie}
              onAddWatched={onAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                OnDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
