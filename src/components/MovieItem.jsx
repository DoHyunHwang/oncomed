import React from "react";
import style from "./MovieItem.module.css";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

export default function MovieItem(props) {
  const navigate = useNavigate();

  // 장르 ID에 해당하는 장르 이름을 찾아 문자열로 반환하는 함수
  const getGenreNames = () => {
    if (!props.genres) return ""; // genres가 없으면 빈 문자열 반환

    return props.genre_ids
      .map(
        (id) => props.genres?.find((genre) => genre.id === id)?.name // 해당 ID와 일치하는 장르 객체를 찾아 이름을 반환
      )
      .filter(Boolean)
      .join(", "); // undefined를 제거하고, 이름들을 쉼표로 구분된 문자열로 합침
  };

  const onClick = () => {
    navigate(`/movie/${props.id}/${props.language}`);
  };

  return (
    <div className={style.container} onClick={onClick}>
      <img
        className={style.poster_img}
        src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
      />
      <div className={style.content}>
        <div className={style.title}>{props.title}</div>
        <span>{props.genre_ids && props.genres && getGenreNames()}</span>
        <div className={style.rating}>
          <Rating
            name="read-only"
            value={props.vote_average / 2}
            // max={10}
            precision={0.1}
            readOnly
          />
        </div>
        <div className={style.overview}>{props.overview || "..."}</div>
      </div>
    </div>
  );
}
