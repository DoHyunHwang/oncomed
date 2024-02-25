import { useParams } from "react-router-dom";
import style from "./Movie.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Rating } from "@mui/material";

export default function Movie() {
  const params = useParams();

  // 영화 상세정보
  const getDetailMovie = async () => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${params.id}`, {
      params: {
        language: params.language,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTk3ZTQ5MWVkNmU4MGYwZGUxMmUzNDllYjYwZWE2ZSIsInN1YiI6IjViNjJhOWNmMGUwYTI2N2VlNzAyYjdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nEypJq66ar-tr-KtFz-AC910YhdLakTDSM-oeIDLwQ",
      },
    });
  };

  const { data } = useQuery({
    queryKey: ["detailMovie"],
    queryFn: () => getDetailMovie().then((res) => res.data),
  });

  if (!data) {
    return <div>Loading ...</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>
          <h1>{data.title}</h1>
          <h3>{data.tagline}</h3>
        </div>
        <div className={style.genres}>
          {data?.genres.map((item, index) =>
            data?.genres[index + 1] ? `${item.name}, ` : item.name
          )}
        </div>
        <div className={style.rating}>
          <Rating
            name="read-only"
            value={data.vote_average / 2}
            // max={10}
            precision={0.1}
            readOnly
          />
        </div>
        <div className={style.info}>
          <div>인기: {data.popularity}</div>
          <div>상영시간: {data.runtime} 분</div>
        </div>
      </div>
      <img
        className={style.poster_img}
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={`${data.title}의 포스터 이미지`}
      />
      <div className={style.body}>
        <div className={style.overview}>{data.overview || "..."}</div>
      </div>
    </div>
  );
}
