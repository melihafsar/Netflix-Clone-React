import React from "react";
import { MovieContext, useContext } from "../context/MovieContext";

function Card({movie, movieDetail}) {
  const { setModalOpen, setMovieDetail } = useContext(MovieContext);
  
  const movieImg = `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`;
  return (
    <div className="card" onClick={() => {
      setModalOpen(true);
      setMovieDetail(movie);
    }}> 
          <img width="90%" className={`${movieDetail.classNameImg}`} src={movieImg} alt={movie.title} title={movie.title} />
    </div> 
  )
}

export default Card


// {
//   return (
//     <>
//         <a className="card" href="#">
//         {/* {
//           movieDetail.classNameSpan && 
//           (
//             <span className={movieDetail.classNameSpan}>{item}</span>
//           )
//         } */}
//           <img width="90%" className={`${movieDetail.classNameImg}`} src={movieImg} alt={movie.title} title={movie.title} />
//         {/* {
//           isActive_bar && (
//             <div className="progress-bar">
//               <div className="progress"></div>
//             </div>
//           ) 
//         } */}
//         </a>
        
//     </>
//   )
// }