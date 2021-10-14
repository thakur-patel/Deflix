import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import useOnClickOutside from 'hooks/useOnClickOutside';
import PrimaryButton from 'components/UI/Button/PrimaryButton';

function Nav(props) {
  const [isNavOpen, setNavOpen] = useState(false);
  const [showNavBar, setNavShow] = useState(false);
  const handleScroll = () => {
    const Yoffset = props.Yoffset || 150;
    if (window.pageYOffset > Yoffset) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navRef = useRef();
  useOnClickOutside(navRef, () => setNavOpen(false));
  return (
    <div
      ref={navRef}
      className={clsx(
        { 'translate-y-32': showNavBar },
        'fixed -top-32 z-50 w-full text-gray-200 transition-all transform bg-myblack'
      )}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 md:px-6 lg:px-8 mx-auto max-w-screen-xl">
        <div className="flex flex-row justify-between items-center p-3">
          <a className="px-3" href="/">
            <img
              className="object-contain h-10"
              src="https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png"
              alt="Deflix Logo"
            />
          </a>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            onClick={() => setNavOpen(!isNavOpen)}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-6 h-6"
            >
              <path
                className={clsx({ hidden: isNavOpen })}
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
              <path
                className={clsx({ hidden: !isNavOpen })}
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={clsx(
            { flex: isNavOpen, hidden: !isNavOpen },
            'md:flex flex-col md:flex-row flex-grow lg:flex-grow-0 my-2 space-y-2 md:space-y-0 w-full lg:w-1/2'
          )}
        >
          <PrimaryButton tailwindClass="banner__button">
            Blog
          </PrimaryButton>
          <PrimaryButton tailwindClass="banner__button">
            Portfolio
          </PrimaryButton>
          <PrimaryButton tailwindClass="banner__button">
            About
          </PrimaryButton>
          <PrimaryButton tailwindClass="banner__button">
            Contact
          </PrimaryButton>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
