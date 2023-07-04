
import AppHeader from "../appHeader/AppHeader";
import HeroInfo from '../heroInfo/HeroInfo';
import HeroList from '../heroList/HeroList';
import HeroRandom from '../heroRandom/HeroRandom';

import decoration from '../../resources/img/vision.png';


const App = () => {
   return (
      <div className="app">
         <AppHeader />
         <main>
            <HeroRandom />
            <div className="hero__content">
               <HeroList />
               <HeroInfo />
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
         </main>
      </div>
   )
}

export default App;