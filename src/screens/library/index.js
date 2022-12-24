import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./library.css";
import { useNavigate } from "react-router-dom";

export default function Library() {
   // Состояние плейлистов(playlist - плейлисты, setplaylist - назначить плейлист в массив playlist)
   const [playlists, setPlaylists] = useState(null);

   // С помощью useEffect получаем плейлисты из личного профиля Sporify
   useEffect(() => {
      APIKit.get("me/playlists").then(function (response) {
         setPlaylists(response.data.items);
      });
   }, []);

   // useNavigate - Хук навигации для перемещния между страницами
   const navigate = useNavigate();

   // Переадресация на плеер и запуск активного плейлиста
   const playPlaylist = (id) => {
      navigate("/player", { state: { id: id } });
   };

   return (
      <div className="screen-container">
         <div className="library-body">
            {playlists?.map((playlist) => (
               <div
                  className="playlist-card"
                  key={playlist.id}
                  onClick={() => playPlaylist(playlist.id)}
               >
                  <img
                     src={playlist.images[0].url}
                     className="playlist-image"
                     alt="Playlist-Art"
                  />
                  <p className="playlist-title">{playlist.name}</p>
                  <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
                  <div className="playlist-fade">
                     <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                        <AiFillPlayCircle />
                     </IconContext.Provider>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
