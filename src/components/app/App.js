import { Component } from "react";


// import AppBanner from "../appBanner/AppBanner";
import AppHeader from "../appHeader/AppHeader";
// import ComicsList from "../comicsList/ComicsList";
// import SingleComics from "../singleComics/SingleComics";
import HeroInfo from '../heroInfo/HeroInfo';
import HeroList from '../heroList/HeroList';
import HeroRandom from '../heroRandom/HeroRandom';
// import Selector from "../selector/Selector";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
   state = {
      selectedHero: null
   }

   onHeroSelected = (id) => {
      this.setState({
         selectedHero: id
      })
   }
   render() {
      return (
         <div className="app" >
            <AppHeader />
            <main>
               <ErrorBoundary>
                  <HeroRandom />
               </ErrorBoundary>
               {/* <AppBanner /> */}
               <div className="hero__content">
                  <ErrorBoundary>
                     <HeroList onHeroSelected={this.onHeroSelected} />
                  </ErrorBoundary>
                  <ErrorBoundary>
                     <HeroInfo heroId={this.state.selectedHero} />
                  </ErrorBoundary>
                  {/* <Selector /> */}
                  {/* <ComicsList /> */}
                  {/* <SingleComics /> */}
               </div>
               <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
         </div>
      )
   }
}

export default App;