import './heroList.scss';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';



const HeroList = (props) => {

   const [list, setList] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [newItemLoading, setnewItemLoading] = useState(false);
   const [offset, setOffset] = useState(440);
   const [heroesEnded, setHeroesEnded] = useState(false);

   const marvelService = new MarvelService();

   useEffect(() => {
      onRequest();
   }, [])

   const onRequest = (offset, limitIn) => {
      onHeroListloading();

      marvelService.getAllHeroes(offset, limitIn)
         .then(onHeroListLoaded)
         .catch(onError)
   }

   const onHeroListloading = () => {
      setnewItemLoading(true);
   }

   const onHeroListLoaded = (newList) => {

      let ended = false;
      if (newList.length < 9) {
         ended = true;
      }

      setList(list => [...list, ...newList])
      setLoading(false)
      setnewItemLoading(newItemLoading => false)
      setOffset(offset => offset + 9)
      setHeroesEnded(heroesEnded => ended)
   }

   const onError = () => {
      setError(true)
      setLoading(false)
   }

   const itemRefs = useRef([]);

   const itemFocus = (id) => {
      itemRefs.current.forEach(item => {
         item.classList.remove('hero__item_selected')
      });
      itemRefs.current[id].classList.add('hero__item_selected');
      itemRefs.current[id].focus();
   }

   function renderItems(arr) {

      const items = arr.map((item, i) => {
         return (
            <li ref={el => itemRefs.current[i] = el}
               tabIndex={0}
               className="hero__item"
               key={item.id}
               onClick={() => { props.onHeroSelected(item.id); itemFocus(i) }}
               onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                     e.preventDefault();
                     props.onHeroSelected(item.id);
                     itemFocus(i);
                  }
               }}>
               <img src={item.thumbnail} alt="" className="hero__img" />
               <div className="hero__name">{item.name}</div>
            </li >
         )
      })
      return (<ul className="hero__list" >
         {items}
      </ul >)
   }



   const items = renderItems(list);
   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading ? <Spinner /> : null;
   const content = !(loading || error) ? items : null;
   const alternativeStyle = content ? {} : { 'justifyContent': 'flex-end' };
   const alternativeButton = content ? {} : { 'marginTop': '70%' }
   const hiddenButton = { 'display': heroesEnded ? 'none' : 'block' }

   return (
      <div className='hero' style={alternativeStyle}>
         {errorMessage}
         {spinner}
         {content}
         <button
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{ ...alternativeButton, ...hiddenButton }}
            onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
         </button>
      </div >
   )
}

export default HeroList;