import {Component} from 'react'
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

function MarketPlace(){
    return(
        <div className="container">
            
        </div>
    );
}


export default class Market extends Component {
    render(){
      return (
        <div>
        <Header />
        <Nav />
        <MarketPlace />
        <Footer />
        </div>
      );
    }
  }