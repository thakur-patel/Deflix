import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

function RootLayout({ children }) {
	return (
		<>
			<Header />
			<Nav />
			{children}
			<Footer />
		</>
	);
}

export default RootLayout;
