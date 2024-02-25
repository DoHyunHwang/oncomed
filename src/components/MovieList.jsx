import React from "react";
import style from "./MovieList.module.css";
import MovieItem from "./MovieItem";

export default function MovieList({ results, genres, language }) {
  return (
    <div className={style.continer}>
      {results.map((movie) => (
        <MovieItem key={movie.id} {...movie} {...genres} language={language} />
      ))}
    </div>
  );
}

MovieList.defaultProps = {
  results: [],
};
