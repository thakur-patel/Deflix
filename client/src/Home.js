import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import './Home.css';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

// const [trailerUrl, setTrailerUrl] = useState("");

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
      autoplay: 1,
  }
}

// const onMouseOver = (movie) => {
//   if(trailerUrl){
//       setTrailerUrl("");
//   } else {
//       movieTrailer(movie?.name || "")
//       .then((url) => {
//           const urlParams = new URLSearchParams(new URL(url).search);
//           setTrailerUrl(urlParams.get('v'));
//       })
//       .catch(() => console.log('Temporary Unavailable'))
//   }
// }

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      videos: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4000/videos');
      const data = await response.json();
      this.setState({ videos: [...data] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App-header">
        <Header />
        <Nav />
        <div className="container">
          <div className="row">
            New Releases
            <div className = "row__posters">
              {this.state.videos.map(video =>
                <div className="col-md-4" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card border-0">
                    <img 
                      src={`http://localhost:4000${video.poster}`} 
                      alt={video.name} 
                      // onMouseOver = {() => onMouseOver(video)}
                      className = {"row__posterLarge"}
                    />
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
                {/* {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts}/> } */}
              </div>
              )}
          </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
