import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import '../styles/Home.css';
import 'components/Carousel/MyCarousel';
import MyCarousel from 'components/Carousel/MyCarousel';
import DisplayCard from 'components/DisplayCard/DisplayCard';

const NewSongs = [
  {
    name: 'Song1',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 2,
  },
  {
    name: 'Song2',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 3,
  },
  {
    name: 'Song3',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 4,
  },
  {
    name: 'Song4',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 5,
  },
];

const Gameplay = [
  {
    name: 'Gameplay1',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 2,
  },
  {
    name: 'Gameplay2',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 3,
  },
  {
    name: 'Gameplay3',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 4,
  },
  {
    name: 'Gameplay4',
    imgUrl:
      'https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png',
    duration: 5,
  },
];
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        'https://dether.herokuapp.com/videos'
      );
      const data = await response.json();
      this.setState({ videos: [...data] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const newSongJSX = NewSongs.map((song) => (
      <DisplayCard key={song.name} id={song.name} item={song} />
    ));

    const GameplayJSX = Gameplay.map((item) => (
      <DisplayCard key={item.name} id={item.name} item={item} />
    ));
    return (
      <RootLayout>
        <div className="container">
          <div className="row_final">
            <span className="second-final">New Movies</span>
            <div className="flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 row__posters">
              {this.state.videos.map((video) => (
                <div className="col-md-4" key={video.id}>
                  <Link to={`/player/${video.id}`}>
                    <div className="border-0 card">
                      <video
                        crossOrigin="anonymous"
                        allow="autoplay"
                        loop
                        poster={`https://dether.herokuapp.com/video/${video.id}/poster`}
                        onMouseOver={(event) => event.target.play()}
                        onMouseOut={(event) => event.target.load()}
                        src={`https://dether.herokuapp.com/trailer/${video.id}`}
                      ></video>
                      <div className="card-body-final">
                        <p>{video.name}</p>
                        <p>{video.duration}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 font-semibold soon">
          <span className="second">
            Comming Soon... <br />
            <br />
            New Songs
          </span>
          <div className="new_songs">
            <MyCarousel items={newSongJSX} dark />
          </div>
          <span className="second">Gameplay</span>
          <div className="gameplay">
            <MyCarousel items={GameplayJSX} dark />
          </div>
        </div>
      </RootLayout>
    );
  }
}
