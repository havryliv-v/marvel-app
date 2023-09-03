import { useState } from 'react';
import { Helmet } from 'react-helmet'

import HeroInfo from '../../heroInfo/HeroInfo';
import HeroList from '../../heroList/HeroList';
import HeroRandom from '../../heroRandom/HeroRandom';
import SearchHero from '../../searchHero/SearchHero';
import decoration from '../../../resources/img/vision.png';

import './mainPage.scss'

const MainPage = () => {

   const [selectedHero, setHero] = useState(null);

   const onHeroSelected = (id) => {
      setHero(id);
   }
   return (
      <>
         <Helmet>
            <meta
               name="description"
               content="Marvel information portal" />
            <title>Marvel information portal</title>
         </Helmet>
         <HeroRandom />
         <div className="hero__content">
            <HeroList onHeroSelected={onHeroSelected} />
            <div className="hero__side">
               <HeroInfo heroId={selectedHero} />
               <SearchHero />
            </div>
         </div>
         <img className="bg-decoration" src={decoration} alt="vision" />
      </>
   )
}

export default MainPage;