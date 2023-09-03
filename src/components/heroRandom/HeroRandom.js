import React, { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import mjolnir from '../../resources/img/mjolnir.png';
import setContent from '../../utils/setContent';


import './heroRandom.scss';

const HeroRandom = () => {
   const [hero, setHero] = useState({});
   const { getHero, clearError, process, setProcess } = useMarvelService();

   useEffect(() => {
      updateHero();
      const timerId = setInterval(updateHero, 6000000);
      return () => {
         clearInterval(timerId)
      }
   }, [])

   const onHeroloaded = (hero) => {
      setHero(hero)
   }

   const updateHero = () => {
      clearError();
      const id = Math.floor(Math.random() * (1011334 - 1009742) + 1009742);
      getHero(id)
         .then(onHeroloaded)
         .then(() => setProcess('confirmed'))
         .catch((error) => {
            console.error(error);
         });
   }


   return (
      <div className='randomhero'>
         {setContent(process, View, hero)}
         <div className="randomhero__static">
            <p className="randomhero__title">Random character for today! <br />
               Do you want to get to know him better?</p>
            <p className="randomhero__title">Or choose another one
            </p>
            <button className="button button__main" onClick={updateHero}>
               <div className="inner" >try it</div>
            </button>
            <img src={mjolnir} alt="hero-img" className="randomhero__decor" />
         </div>
      </div>
   )
}

const View = ({ data }) => {

   const { name, thumbnail, description, homepage, wiki } = data;
   const contain = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? 'randomhero__contain' : '';
   const descrShorter = description?.length >= 227 ? `${description.slice(0, 227)}...` : description
   return (
      <div className="randomhero__block">
         <img src={thumbnail} alt="hero-img" className={`randomhero__img , ${contain}`} />
         <div className="randomhero__info">
            <p className='randomhero__name'>{name}</p>
            <p className="randomhero__text">{descrShorter}</p>
            <div className="randomhero__btns">
               <a href={homepage} className="button button__main">
                  <div className="inner">Homepage</div>
               </a>
               <a href={wiki} className="button button__secondary">
                  <div className="inner">Wiki</div>
               </a>
            </div>
         </div>
      </div>
   )
}

export default HeroRandom;