import { useState } from 'react';

import HeroInfo from '../heroInfo/HeroInfo';
import HeroList from '../heroList/HeroList';
import HeroRandom from '../heroRandom/HeroRandom';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


import decoration from '../../resources/img/vision.png';

const MainPage = () => {

   const [selectedHero, setHero] = useState(null);

   const onHeroSelected = (id) => {
      setHero(id);
   }
   return (
      <>
         <ErrorBoundary>
            <HeroRandom />
         </ErrorBoundary>
         <div className="hero__content">
            <HeroList onHeroSelected={onHeroSelected} />
            <ErrorBoundary>
               <HeroInfo heroId={selectedHero} />
            </ErrorBoundary>
         </div>
         <img className="bg-decoration" src={decoration} alt="vision" />

      </>
   )
}

export default MainPage;