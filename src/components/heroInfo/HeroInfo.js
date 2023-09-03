import React, { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import setContent from '../../utils/setContent';

import './heroInfo.scss';




const HeroInfo = (props) => {

   const [hero, setHero] = useState(null);
   const { error, loading, getHero, clearError, process, setProcess } = useMarvelService();

   useEffect(() => {
      updateHero();
   }, [props.heroId])

   const updateHero = () => {
      const { heroId } = props;
      if (!heroId) {
         return;
      }
      clearError()
      getHero(heroId)
         .then(onHeroloaded)
         .then(() => setProcess('confirmed'))
   }

   const onHeroloaded = (hero) => {
      setHero(hero)
   }

   return (
      <div className="hero__info">
         {setContent(process, View, hero)}
      </div>
   )
}

const View = ({ data }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = data
   return (
      <div className="hero__info-inner">
         <div className="hero__basic">
            <img src={thumbnail} alt={name} />
            <div className="hero__basic-block">
               <div className="hero__basic-name">{name}</div>
               <div className="hero__basic-btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="hero__descr">{description}</div>
         <div className="hero__comics">Comics:</div>
         <ul className="hero__comics-list">
            {comics.length > 0 ? null : 'There is no comics with this person'}
            {
               comics.slice(0, 8).map((item, i) => {
                  const comicsId = item.resourceURI.slice(43);
                  return (<li key={i} className="hero__comics-item"><Link to={`/comics/${comicsId}`}>{item.name}</Link></li>)
               })
            }
         </ul>
      </div>

   )
}

export default HeroInfo;