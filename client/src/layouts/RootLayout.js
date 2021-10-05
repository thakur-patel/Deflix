import React, { useState } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MyCarousel from 'components/Carousel/MyCarousel';

function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
