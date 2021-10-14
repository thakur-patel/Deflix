import React, { useState } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Nav from 'components/Nav/Nav';

function RootLayout({ children }) {
  return (
    <>
      <Nav />
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
