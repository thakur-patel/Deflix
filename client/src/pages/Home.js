import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import '../styles/Home.css';
import 'components/Carousel/MyCarousel';
import MyCarousel from 'components/Carousel/MyCarousel';
import DisplayCard from 'components/DisplayCard/DisplayCard';

const NewSongs = [
  {
    name: 'StarBoy',
    imgUrl:
      'https://i.pinimg.com/originals/3a/f0/e5/3af0e55ea66ea69e35145fb108b4a636.jpg',
    duration: 2,
    author: 'Weekend',
  },
  {
    name: 'Pain',
    imgUrl:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
    duration: 3,
    author: 'Ryan Jones',
  },
  {
    name: 'Havana',
    imgUrl:
      'https://i1.sndcdn.com/artworks-000277650419-hhso6q-t500x500.jpg',
    duration: 4,
    author: 'Camila Cabello',
  },
  {
    name: 'Perfect',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/en/8/80/Ed_Sheeran_Perfect_Single_cover.jpg',
    duration: 5,
    author: 'Ed Sheeran',
  },
  {
    name: 'Lonely',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51aq3xWheEL._AC_SX425_.jpg',
    duration: 3,
    author: 'Akon',
  },
  {
    name: 'Give Me EveryThing',
    imgUrl:
      'https://e.snmc.io/i/1200/s/1f7d8f5fbbd0e1a3fa9160247f83637a/3666224',
    duration: 4,
    author: 'Pitbull',
  },
  {
    name: 'What makes you beautiful',
    imgUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61JPEqGHJcL._AC_SX466_.jpg',
    duration: 3,
    author: 'One Direction',
  },
  {
    name: 'Follow your fire',
    imgUrl:
      'https://i.scdn.co/image/ab67616d0000b2732112db8aa9dabc6cdd9e14d0',
    duration: 3,
    author: 'Kodaline',
  },
  {
    name: 'Hymn For The Weekend',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png',
    duration: 3,
    author: 'Coldplay',
  },
];

const Gameplay = [
  {
    name: 'Valorant',
    imgUrl:
      'https://cdna.artstation.com/p/assets/images/images/036/947/866/large/ismael-fofana-valorant-game-poster-design.jpg?1619051884&dl=1',
    duration: 2,
  },
  {
    name: 'CS-GO',
    imgUrl:
      'https://i.pinimg.com/originals/81/bb/27/81bb2759d8a548a1a05e3b1b0ad94ffc.jpg',
    duration: 3,
  },
  {
    name: 'Assassins Creed - Valhalla ',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/en/f/f8/ACValhalla.jpg',
    duration: 4,
  },
  {
    name: 'BatMan - Arkham Origins',
    imgUrl:
      'https://howlongtobeat.com/games/Batman-Arkham-Origins-Box-Art.jpg',
    duration: 5,
  },
  {
    name: 'SpiderMan',
    imgUrl:
      'https://terrigen-cdn-dev.marvel.com/content/prod/1x/marvsmposterbk_intdesign.jpg',
    duration: 5,
  },
  {
    name: 'Fortnite',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR11uOg-rHlCe50d0fDdTx6Gh33u59zJOIurRvIGjbzv66DcuxtPLq-crT90bLhqtxsauc&usqp=CAU',
    duration: 5,
  },
];
// https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png
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
