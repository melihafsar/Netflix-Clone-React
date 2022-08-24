import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from "./Modal";
import axios from "axios";
import { useEffect, useState } from "react";
import HomePage from "../Pages/HomePage";
import { MovieContext } from "../context/MovieContext";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../Pages/LoginPage";
import PopularActors from '../Pages/PopularActors';
import MoviePage from '../Pages/MoviePage';
import MyList from '../Pages/MyList';
import ActorInfoPage from '../Pages/ActorInfoPage';
import { ActorContext } from '../context/ActorContext';
// import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import


// console.log(process.env.REACT_APP_API_KEY);

const movieBaseURL = "https://api.themoviedb.org/3/";
const popularURL = `${movieBaseURL}movie/popular?api_key=36a5061485b27e94b39f5b1cdc2a97a2&language=en-US&page=1`;
const topRatedURL = `${movieBaseURL}movie/top_rated?api_key=36a5061485b27e94b39f5b1cdc2a97a2&language=en-US&page=1`;
const upComingURL = `${movieBaseURL}movie/upcoming?api_key=36a5061485b27e94b39f5b1cdc2a97a2&language=en-US&page=1`;
const nowPlayingURL = `${movieBaseURL}movie/now_playing?api_key=36a5061485b27e94b39f5b1cdc2a97a2&language=en-US&page=1`;
const actorURL = "https://api.themoviedb.org/3/person/popular?api_key=36a5061485b27e94b39f5b1cdc2a97a2&language=en-US&page=1";
const listsMovieURL = `${movieBaseURL}list/8214743?api_key=36a5061485b27e94b39f5b1cdc2a97a2&language=en-US`;


function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [actorId, setActorId] = useState(0);
  const [actorsInfo, setActorsInfo] = useState([]);
  const [actorKnownWorks, setActorKnownWorks] = useState([]);
  const [listsMovie, setListsMovie] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: popular } = await axios(popularURL);
      const { data: topRated } = await axios(topRatedURL);
      const { data: upComing } = await axios(upComingURL);
      const { data: nowPlaying } = await axios(nowPlayingURL);
      const { data: actors } = await axios(actorURL);
      const { data: movie } = await axios(listsMovieURL);
      setListsMovie(movie.items);
      setActorsInfo(actors.results);
      setMoviesInfo([popular.results, topRated.results, upComing.results, nowPlaying.results]);
    })();
  }, []);

  const data = {
    setModalOpen,
    setMovieDetail,
    setListsMovie,

    moviesInfo,
    actorsInfo,
    listsMovie,
    
    deleteMovie,
    addListMovie,
  }
  const actorID = {
    actorId,
    setActorId,
    actorKnownWorks,
    setActorKnownWorks,
  }

  function addListMovie(movie) {
    const newMovieList = listsMovie.push(movie);
    setListsMovie[newMovieList];
  }

  function deleteMovie(movie) {
    const newMovieList = listsMovie.filter(
      m => m.id !== movie.id
    );
    setListsMovie(newMovieList);
  }

  return (
    <>
      <MovieContext.Provider value={data}>
        {modalOpen && <Modal setOpenModal={setModalOpen} movieDetail={movieDetail} />}
        <ActorContext.Provider value={actorID}>
          <Header />
          <Routes>
            <Route path="/" element={< HomePage />} />
            <Route path="/movies-series" element={< MoviePage />} />
            <Route path="/popular-actors" element={< PopularActors />} />
            <Route path='/popular-actors/actor-name' element={<ActorInfoPage />} />
            <Route path="/my-list" element={< MyList />} />
            <Route path="/login" element={< LoginPage />} />
          </Routes>
        </ActorContext.Provider>
      </MovieContext.Provider>
      <Footer />
    </>
  )
}

export default App
