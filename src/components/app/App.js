
// import AppBanner from "../appBanner/AppBanner";
import AppHeader from "../appHeader/AppHeader";
// import ComicsList from "../comicsList/ComicsList";
// import SingleComics from "../singleComics/SingleComics";
import HeroInfo from '../heroInfo/HeroInfo';
import HeroList from '../heroList/HeroList';
import HeroRandom from '../heroRandom/HeroRandom';
// import Selector from "../selector/Selector";

import decoration from '../../resources/img/vision.png';

const App = () => {
   return (
      <div className="app">
         <AppHeader />
         <main>
            <HeroRandom />
            {/* <AppBanner /> */}
            <div className="hero__content">
               <HeroList />
               <HeroInfo />
               {/* <Selector /> */}
               {/* <ComicsList /> */}
               {/* <SingleComics /> */}
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
         </main>
      </div>
   )
}

export default App;