import React, { useEffect, useState } from "react";
import "../UserPlaylist/UserPlaylist.css";
import { NavLink, useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import pausa from "../../Img/pausa.svg";
import play from "../../Img/play.svg";
import copia from "../../Img/copia.png";

function UserPlaylist() {
  const playlist_id = useParams("id");
  const [playlist_name, setPlaylist_name] = useState("");
  const [songs, setSongs] = useState([]);
  const songsImg = [];
  const user_id = localStorage.getItem("user_id");
  const [copyPlaylist, setCopyPlaylist] = useState(false);
  //duración de la playlist
  const [duration, setDuration] = useState(0);
  const hours = parseInt(duration / 3600);
  const min = parseInt((duration - 3600 * hours) / 60);
  const sec = (duration - 3600 * hours - 60 * min) % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMin = String(min).padStart(2, "0");
  const formattedSec = String(sec).padStart(2, "0");
  const [playPause, setPlayPause] = useState(play);

  function playOrPause() {
    if (playPause === play) {
      setPlayPause(pausa);
    } else {
      setPlayPause(play);
    }
  }

  console.log(duration);
  const listen = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_id: user_id,
      song_id: id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/reproductions", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  songs.forEach((song) => {
    if (!songsImg.includes(song.image)) {
      songsImg.push(song.image);
    }
  });
  console.log(songs);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/playlists/songs/${playlist_id.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setSongs(result);
        setPlaylist_name(result[0].playlist_name);
        console.log(result);
        /* for (let i = 0; i <= songs.length; i++) {
                        setDuration(duration + songs[i].duration)
                    } */
      })
      .catch((error) => console.log("error", error));
    console.log(duration);
  }, []);

  useEffect(() => {
    let totalDuration = 0;
    songs.forEach((song) => {
      totalDuration += song.duration;
    });
    setDuration(totalDuration);
  }, [songs]);

  const changePlaylistName = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      playlist_id: playlist_id.id,
      name: playlist_name,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/playlists/changeName", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setCopyPlaylist(false);
  };

  return (
    <div className="userPlContainer">
      <div className="plTitle">
        <NavLink to="/home">
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 8L17 8M8 1L1 8L8 15"
              stroke="#26262E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>

        <h1 className="pl">{playlist_name} </h1>
        <svg
          width="4"
          height="20"
          viewBox="0 0 4 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2Z"
            fill="#26262E"
          />
          <path
            d="M4 10C4 11.1046 3.10457 12 2 12C0.895431 12 0 11.1046 0 10C0 8.89543 0.895431 8 2 8C3.10457 8 4 8.89543 4 10Z"
            fill="#26262E"
          />
          <path
            d="M4 18C4 19.1046 3.10457 20 2 20C0.895431 20 0 19.1046 0 18C0 16.8954 0.895431 16 2 16C3.10457 16 4 16.8954 4 18Z"
            fill="#26262E"
          />
        </svg>
      </div>
      {songsImg.length < 4 ? (
        <div className="plImg2 plImg">
          <div className="artistImg">
            <img src={songsImg[0]} alt="" />
          </div>
        </div>
      ) : (
        <div className="plImg">
          <div className="artistImg">
            <img src={songsImg[0]} alt="" />
          </div>
          <div className="artistImg">
            <img src={songsImg[1]} alt="" />
          </div>
          <div className="artistImg">
            <img src={songsImg[2]} alt="" />
          </div>
          <div className="artistImg">
            <img src={songsImg[3]} alt="" />
          </div>
        </div>
      )}

      <div className="plOptions">
        <svg
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8367 15.2653C16.037 15.2653 15.299 15.5459 14.7209 16.0145L8.90663 11.8082C9.00399 11.2738 9.00399 10.7262 8.90663 10.1918L14.7209 5.98546C15.299 6.45408 16.037 6.73469 16.8367 6.73469C18.6944 6.73469 20.2041 5.225 20.2041 3.36735C20.2041 1.50969 18.6944 0 16.8367 0C14.9791 0 13.4694 1.50969 13.4694 3.36735C13.4694 3.69286 13.5143 4.00434 13.6013 4.30179L8.07883 8.30051C7.25944 7.21454 5.9574 6.5102 4.4898 6.5102C2.00918 6.5102 0 8.51939 0 11C0 13.4806 2.00918 15.4898 4.4898 15.4898C5.9574 15.4898 7.25944 14.7855 8.07883 13.6995L13.6013 17.6982C13.5143 17.9957 13.4694 18.3099 13.4694 18.6327C13.4694 20.4903 14.9791 22 16.8367 22C18.6944 22 20.2041 20.4903 20.2041 18.6327C20.2041 16.775 18.6944 15.2653 16.8367 15.2653ZM16.8367 1.90816C17.6421 1.90816 18.2959 2.56199 18.2959 3.36735C18.2959 4.1727 17.6421 4.82653 16.8367 4.82653C16.0314 4.82653 15.3776 4.1727 15.3776 3.36735C15.3776 2.56199 16.0314 1.90816 16.8367 1.90816ZM4.4898 13.4694C3.12883 13.4694 2.02041 12.361 2.02041 11C2.02041 9.63903 3.12883 8.53061 4.4898 8.53061C5.85077 8.53061 6.95918 9.63903 6.95918 11C6.95918 12.361 5.85077 13.4694 4.4898 13.4694ZM16.8367 20.0918C16.0314 20.0918 15.3776 19.438 15.3776 18.6327C15.3776 17.8273 16.0314 17.1735 16.8367 17.1735C17.6421 17.1735 18.2959 17.8273 18.2959 18.6327C18.2959 19.438 17.6421 20.0918 16.8367 20.0918Z"
            fill="#26262E"
          />
        </svg>
        {playlist_name === "Cupido Musical" ||
        playlist_name === "Música contextual" ? (
          <p onClick={() => setCopyPlaylist(true)} className="copy">
            <img className="image-copia" src={copia} alt="crear copia" /> Crear
            Copia
          </p>
        ) : null}
        {formattedHours > 0 ? (
          <p>
            {formattedHours}:{formattedMin}:{formattedSec}
          </p>
        ) : (
          <p>
            {min}:{sec}
          </p>
        )}
        <img onClick={playOrPause} src={playPause} alt="" />
        {/*  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.81514 7.67391L10.8522 9.71095C11.0016 9.86033 11.0763 10.0505 11.0763 10.2813C11.0763 10.5122 11.0016 10.7023 10.8522 10.8517C10.7028 11.0011 10.5127 11.0758 10.2818 11.0758C10.0509 11.0758 9.86082 11.0011 9.71144 10.8517L7.42996 8.57021C7.34847 8.48873 7.28736 8.39692 7.24662 8.2948C7.20588 8.19322 7.18551 8.08811 7.18551 7.97947V4.74058C7.18551 4.50971 7.26373 4.31606 7.42018 4.15962C7.57608 4.00371 7.76946 3.92576 8.00033 3.92576C8.23119 3.92576 8.42484 4.00371 8.58129 4.15962C8.73719 4.31606 8.81514 4.50971 8.81514 4.74058V7.67391ZM8.00033 15.3332C6.35712 15.3332 4.88366 14.8475 3.57995 13.8763C2.27625 12.9056 1.40033 11.6393 0.952177 10.0776C0.884276 9.83317 0.908177 9.60231 1.02388 9.38502C1.13904 9.16774 1.31884 9.03194 1.56329 8.97761C1.79415 8.92329 2.00139 8.97408 2.18499 9.12999C2.36805 9.28643 2.49354 9.48008 2.56144 9.71095C2.91452 10.906 3.59707 11.8702 4.60907 12.6035C5.62052 13.3369 6.75094 13.7035 8.00033 13.7035C9.58921 13.7035 10.9369 13.15 12.0434 12.0429C13.1505 10.9364 13.704 9.58873 13.704 7.99984C13.704 6.41095 13.1505 5.06297 12.0434 3.95591C10.9369 2.84939 9.58921 2.29613 8.00033 2.29613C7.06329 2.29613 6.18736 2.51342 5.37255 2.94799C4.55773 3.38255 3.87193 3.98008 3.31514 4.74058H4.74107C4.97193 4.74058 5.16559 4.81853 5.32203 4.97443C5.47793 5.13087 5.55588 5.32453 5.55588 5.55539C5.55588 5.78626 5.47793 5.97964 5.32203 6.13554C5.16559 6.29199 4.97193 6.37021 4.74107 6.37021H1.48181C1.25094 6.37021 1.05756 6.29199 0.901659 6.13554C0.745214 5.97964 0.666992 5.78626 0.666992 5.55539V2.29613C0.666992 2.06527 0.745214 1.87162 0.901659 1.71517C1.05756 1.55927 1.25094 1.48132 1.48181 1.48132C1.71267 1.48132 1.90633 1.55927 2.06277 1.71517C2.21867 1.87162 2.29662 2.06527 2.29662 2.29613V3.39613C2.98921 2.527 3.83472 1.85478 4.83314 1.37947C5.83102 0.904158 6.88674 0.666504 8.00033 0.666504C9.01884 0.666504 9.97299 0.859887 10.8628 1.24665C11.752 1.63396 12.5261 2.1568 13.185 2.81517C13.8434 3.47408 14.3662 4.24816 14.7535 5.13739C15.1403 6.02717 15.3337 6.98132 15.3337 7.99984C15.3337 9.01836 15.1403 9.97223 14.7535 10.8615C14.3662 11.7512 13.8434 12.5253 13.185 13.1837C12.5261 13.8426 11.752 14.3657 10.8628 14.753C9.97299 15.1398 9.01884 15.3332 8.00033 15.3332Z" fill="#26262E" />
                </svg> */}
      </div>
      {copyPlaylist ? (
        <div className="modal">
          <div className="pop-up">
            <p className="pop-up-title">Nombre de la playlist:</p>
            <input
              value={playlist_name}
              onChange={(e) => {
                setPlaylist_name(e.target.value);
              }}
              className="pop-up-input "
              type="text"
            />
            <button onClick={changePlaylistName} className="btn-standard">
              ¡Guardar playlist!
            </button>
          </div>
        </div>
      ) : null}
      <div className="plOptions2"></div>
      <div className="playlist">
        <div className="card-container-results">
          {songs.map((song) => (
            <div className="song-container">
              <div className="song-img">
                <img onClick={() => listen(song.id)} src={song.image} alt="" />
              </div>
              <div className="text-container">
                <div className="song-name">{song.name}</div>
                <div className="song-artist">{song.artist_name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
}
export default UserPlaylist;
