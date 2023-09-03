import './heroList.scss';
import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const setContent = (process, Component, newItemLoading) => {
   switch (process) {
      case 'waiting':
         return < Spinner />;
         break;
      case 'loading':
         return newItemLoading ? <Component /> : <Spinner />;
         break;
      case 'confirmed':
         return <Component />;
         break;
      case 'error':
         return <ErrorMessage />;
         break;
      default:
         throw new Error('Unexpected process state')
   }
}

const HeroList = (props) => {

   const [list, setList] = useState([]);
   const [newItemLoading, setnewItemLoading] = useState(false);
   const [offset, setOffset] = useState(440);
   const [heroesEnded, setHeroesEnded] = useState(false);
   const { getAllHeroes, process, setProcess } = useMarvelService();

   useEffect(() => {
      onRequest(offset, true);
   }, [])

   const onRequest = (offset, initial) => {
      initial ? setnewItemLoading(false) : setnewItemLoading(true)
      getAllHeroes(offset)
         .then(onHeroListLoaded)
         .then(() => setProcess('confirmed'))
   }

   const onHeroListLoaded = (newList) => {
      let ended = false;
      if (newList.length < 9) {
         ended = true;
      }
      setList(list => [...list, ...newList])
      setnewItemLoading(newItemLoading => false)
      setOffset(offset => offset + 9)
      setHeroesEnded(heroesEnded => ended)

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
            <CSSTransition key={item.id} timeout={700} classNames="hero__item">
               <li className="hero__item"
                  key={item.id}
                  onClick={() => { props.onHeroSelected(item.id); itemFocus(i) }}
                  onKeyDown={(e) => {
                     if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        props.onHeroSelected(item.id);
                        itemFocus(i);
                     }
                  }}
                  ref={el => itemRefs.current[i] = el}
                  tabIndex={0}>
                  <img src={item.thumbnail} alt="" className="hero__img" />
                  <div className="hero__name">{item.name}</div>
               </li >
            </CSSTransition>
         )
      })
      return (<ul className="hero__list" >
         <TransitionGroup component={null}>
            {items}
         </TransitionGroup>
      </ul >)
   }

   const hiddenButton = { 'display': heroesEnded ? 'none' : 'block' }

   return (
      <div className='hero' >
         <div className="hero__wrapper">
            {setContent(process, () => renderItems(list), newItemLoading)}
         </div>
         <button
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{ hiddenButton }}
            onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
         </button>
      </div >
   )
}

export default HeroList;