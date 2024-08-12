import propTypes from "prop-types";
import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader/Loader";
export default function SelectedMovie({
  SelectedTitle,
  onclosemovie,
  onAddWatched,
  watched,
}) {
  const key = "e12869ee";
  const [Movie, SetMovie] = useState({});
  const [Loading, SetLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.title).includes(SelectedTitle);

  const {
    Poster: Poster,
    Title: title,
    Actors: Actors,
    Director: Director,
    Runtime: Runtime,
    Writer: Writer,
    imdbRating: imdbRating,
    Genre: Genre,
    Released: Released,
    Year: Year,
  } = Movie;

  function handleAdd() {
    const NewWatchedMovie = {
      SelectedTitle: SelectedTitle,
      Poster,
      title,
      Runtime: Number(Runtime.split("").at(0)),
      imdbRating: Number(imdbRating),
      Year,
      userRating,
    };
    onAddWatched(NewWatchedMovie);
    onclosemovie();
  }
  useEffect(
    function () {
      async function GetMovieDetails() {
        SetLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&t=${SelectedTitle}`
        );
        const data = await res.json();
        SetMovie(data);

        SetLoading(false);
      }
      GetMovieDetails();
    },
    [SelectedTitle]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "UsePopcorn";
      };
    },
    [title]
  );
  return (
    <div className="flex text-3xl text-blue-400 font-bold p-4 m-2 ">
      <button onClick={onclosemovie} className="absolute ">
        ❌
      </button>
      {/*   <h1>{`selected movie is ${SelectedTitle}`}</h1> */}
      <span className="flex flex-col w-full items-center">
        {Loading ? (
          <Loader />
        ) : (
          <>
            <header className="bg-black flex flex-col">
              <span className="flex justify-center items-center">
                <img
                  src={Poster}
                  alt={title}
                  className="flex w-[150px] h-[150px]"
                />
              </span>
              <h3 className="text-[20px] font-sans text-white p-4">{title}</h3>
              <span className="flex ">
                <h3 className="text-[20px] font-serif p-4 text-orange-200">
                  {Released}
                </h3>
              </span>
              <h3 className="text-[20px] font-mono p-4 text-orange-200">
                Length: {Runtime}
              </h3>

              <h3 className="text-[20px] font-serif p-4 text-orange-200">
                Genre: {Genre}
              </h3>
            </header>

            <section className="flex flex-col m-6">
              <span className="Addtolist">
                {!isWatched ? (
                  <>
                    {" "}
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button onClick={handleAdd}>➕ Add to List</button>
                    )}
                  </>
                ) : (
                  <p>You have Rated this movie</p>
                )}
              </span>
              <div className="relative top-12">
                <h3 className="text-[15px] font-serif p-4 text-orange-200">
                  Starring: {Actors}
                </h3>
                <h3 className="text-[15px] font-mono p-4 text-orange-200">
                  Directed By: {Director}
                </h3>

                <h3 className="text-[15px] font-sans p-4 text-orange-200">
                  Writer: {Writer}
                </h3>
                <h3 className="text-[15px] font-bold p-4 text-orange-200">
                  ⭐: {imdbRating}
                </h3>
              </div>
            </section>
          </>
        )}
      </span>
    </div>
  );
}
SelectedMovie.propTypes = {
  SelectedTitle: propTypes.any.isRequired,
  onclosemovie: propTypes.func.isRequired,
  onAddWatched: propTypes.func.isRequired,
  watched: propTypes.any,
};
