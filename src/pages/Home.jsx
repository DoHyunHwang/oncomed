import { useState } from "react";
import { MenuItem, Pagination, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import style from "./Home.module.css";
import MovieList from "../components/MovieList";

export default function Home() {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("ko-KR"); // ko-KR, en-US

  // 상영중인 영화 정보 리스트
  const getNowPlayingMovies = async (params) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
      params,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTk3ZTQ5MWVkNmU4MGYwZGUxMmUzNDllYjYwZWE2ZSIsInN1YiI6IjViNjJhOWNmMGUwYTI2N2VlNzAyYjdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nEypJq66ar-tr-KtFz-AC910YhdLakTDSM-oeIDLwQ",
      },
    });
  };

  // 장르 리스트
  const getGenres = async (params) => {
    return await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
      params,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTk3ZTQ5MWVkNmU4MGYwZGUxMmUzNDllYjYwZWE2ZSIsInN1YiI6IjViNjJhOWNmMGUwYTI2N2VlNzAyYjdkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-nEypJq66ar-tr-KtFz-AC910YhdLakTDSM-oeIDLwQ",
      },
    });
  };

  const { data: genres } = useQuery({
    queryKey: ["genresList", { language }],
    queryFn: () => getGenres({ language }).then((res) => res.data),
  });

  const { data, status } = useQuery({
    queryKey: ["movieList", { language, page }],
    queryFn: () =>
      getNowPlayingMovies({ language, page }).then((res) => res.data),
  });

  const handleChangeLang = (event) => {
    setLanguage(event.target.value);
  };

  const onChangePage = (event, page) => {
    setPage(page);
  };

  return (
    <div className={style.container}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={language}
        label="언어"
        onChange={handleChangeLang}
      >
        <MenuItem value={"ko-KR"}>한국어</MenuItem>
        <MenuItem value={"en-US"}>영어</MenuItem>
      </Select>
      {/* Render movies list */}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error fetching data</p>}
      {status === "success" && (
        <MovieList {...data} genres={genres} language={language} />
      )}

      <footer className={style.footer}>
        <Pagination
          count={data?.total_pages}
          page={page}
          onChange={onChangePage}
          color="primary"
        />
      </footer>
    </div>
  );
}
