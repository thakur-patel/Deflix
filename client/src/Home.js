import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import './styles/Home.css';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      videos: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://dether.herokuapp.com/videos');
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
          <div className="row_final">
            <span className="second-final">New Movies</span>
            <div className = "row__posters">
              {this.state.videos.map(video =>
                <div className="col-md-4" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card border-0">
                    <video
                      crossOrigin = 'anonymous'
                      allow="autoplay"
                      loop
                      poster={`https://dether.herokuapp.com/video/${video.id}/poster`}
                      onMouseOver={event => event.target.play()}
                      onMouseOut={event => event.target.load()}
                      src={`https://dether.herokuapp.com/trailer/${video.id}`}  >
                    </video>
                    <div className="card-body-final">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </div>
              )}
            </div>
          </div>
        </div>

        <div className="soon">
          <div className="soon2">
            <div className="row">
              <span className="second">Soon... <br></br><br></br>New Songs</span>
              <div className = "row__posters">
                {this.state.videos.map(video =>
                <div className="songs" key={video.id}>
                  <Link to={`/player/${video.id}`}>
                    <div className="card border-0">
                      <img 
                        src={`https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png`} 
                        alt={video.name} 
                        className = {"row__poster"}
                      />
                      <div className="card-body">
                        <p>Soon</p>
                        <p>&infin;</p>
                      </div>
                    </div>
                  </Link>
                </div>
                )}
                </div>
              </div>
            </div>

            <div className="row">
              <span className="second">Gameplay</span>
              <div className = "row__posters">
                {this.state.videos.map(video =>
                  <div className="col-md-4" key={video.id}>
                  <Link to={`/player/${video.id}`}>
                    <div className="card border-0">
                      <img 
                        src={`https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png`}
                        alt={video.name} 
                        className = {"row__posterLarge"}
                      />
                      <div className="card-body">
                        <p>Soon</p>
                        <p>&infin;</p>
                      </div>
                    </div>
                  </Link>
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
