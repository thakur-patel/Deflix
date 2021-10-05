import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import clsx from 'clsx';

import MovieCard from '../MovieCard/MovieCard';

// to be defined at App and passed through context.
const movies = [
  {
    title: 'Sangchi And The Legend of the Ten rings',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BODYzNjRiNmMtNzUxNy00ZDlkLTgyNzItZGJkZjdlZGZmNzc5XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_FMjpg_UX500_.jpg',
    year: 2010,
    rating: 4.5,
  },
  {
    title: 'Free Guy',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BOTY2NzFjODctOWUzMC00MGZhLTlhNjMtM2Y2ODBiNGY1ZWRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY720_.jpg',
    year: 2011,
    rating: 4.5,
  },
  {
    title: 'Candyman',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BOWEzNDAxYmEtYWU0Zi00ZjZjLTkxY2QtMGY1MjY5ZjVhNDdjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY576_.jpg',
    year: 2012,
    rating: 4.5,
  },
  {
    title: 'Venom: Let There Be Carnage',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BMzU3YTc1ZjMtZTAyOC00ZTI1LWE0MzItMTllN2M2YWI4MWZmXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_FMjpg_UY400_.jpg',
    year: 2013,
    rating: 4.5,
  },
  {
    title: 'The Sucide Squad',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BNGM3YzdlOWYtNjViZS00MTE2LWE1MWUtZmE2ZTcxZjcyMmU3XkEyXkFqcGdeQXVyODEyMTI1MjA@._V1_FMjpg_UY473_.jpg',
    year: 2014,
    rating: 4.5,
  },
  {
    title: 'Cinderalla',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BZTk3ZTEzNGUtZTcwYy00NmRmLWFhMGYtZjA4NWY1ZWI4MzMyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UY473_.jpg',
    year: 2015,
    rating: 4.5,
  },
];

function MyCarousel(props) {
  const chevronWidth = props.chevronWidth || 30;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showChevron, setChevron] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const rightChevron = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'w-7 h-7 hover:bg-opacity-50 rounded-md hover:border-2 transform hover:scale-110',
        {
          'text-white': props.dark,
          'border-black': !props.dark,
        },
        [props.dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100 ']
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  const leftChevron = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'w-7 h-7 hover:bg-opacity-50 rounded-md hover:border transform hover:scale-110',
        {
          'text-white': props.dark,
          'border-black': !props.dark,
        },
        [props.dark ? 'hover:bg-gray-800 ' : 'hover:bg-gray-100 ']
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
  return (
    // <div style={{ padding: `0 ${chevronWidth}px` }}>
    <>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={Math.min(
          windowWidth <= 900 ? 4 : 6,
          movies.length
        )}
        gutter={10}
        rightChevron={rightChevron}
        leftChevron={leftChevron}
        showSlither
        infiniteLoop
        // chevronWidth={chevronWidth}
        classes={{
          itemWrapper: clsx(props.tailwindHeight || 'h-72'),
          itemsWrapper: 'overflow-y-hidden',
          leftChevronWrapper: clsx({
            'opacity-0': !showChevron,
          }),
          rightChevronWrapper: clsx({
            'opacity-0': !showChevron,
          }),
        }}
      >
        {movies.map((movie) => {
          return (
            <div
              key={movie.title}
              onMouseEnter={() => setChevron(false)}
              onMouseLeave={() => setChevron(true)}
              className="w-full h-full"
            >
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </ItemsCarousel>
      {window.innerWidth}
    </>
    // </div>
  );
}

export default MyCarousel;
