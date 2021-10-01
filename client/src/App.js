import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import Player from "./Player";
import License from "./License";
import "./styles/App.css";

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/license' component={License}></Route>
				<Route exact path='/' component={Home}></Route>
				<Route path='/player/:id' component={Player}></Route>
			</Switch>
		</Router>
	);
}

export default App;
