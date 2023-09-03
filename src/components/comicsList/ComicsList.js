
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
// import { useLocaleStore } from '../../hooks/localStorage.hook';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

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

const ComicsList = () => {
   // const { getLocalInfo, pushToLocal } = useLocaleStore()
   const { getAllComics, process, setProcess } = useMarvelService()

   const [comicsList, setComicsList] = useState([])
   const [offset, setOffset] = useState(400);
   const [newItemLoading, setnewItemLoading] = useState(false);
   const [toggle, setToggle] = useState(true);
   const [limit, setLimit] = useState(8)

   useEffect(() => {
      onRequest(offset, true);
   }, [])

   const onRequest = (offset, toggle) => {
      toggle ? setnewItemLoading(false) : setnewItemLoading(true)
      const trueLimit = toggle ? limit : 8
      getAllComics(offset, trueLimit)
         .then(onComicsListLoaded)
         .then(() => setProcess('confirmed'))

   }

   const onComicsListLoaded = (newRes) => {

      setComicsList(comicsList => [...comicsList, ...newRes])
      setOffset(offset => offset + 8)
      setnewItemLoading(false)
      setToggle(false)
      setLimit(limit => limit + 8)
      // pushToLocal(limit)
   }
   const itemRefs = useRef([]);

   const itemFocus = (id) => {
      itemRefs.current.forEach(item => {
         item.classList.remove('comics__item_selected')
      })
      itemRefs.current[id].classList.add('comics__item_selected');
      itemRefs.current[id].focus();

   }

   function renderItems(arr) {

      const items = arr.map((item, i) => {
         return (
            <li className="comics__item"
               key={i}
               onClick={() => itemFocus(i)}
               onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                     e.preventDefault();
                     itemFocus(i);
                  }
               }}
               ref={el => itemRefs.current[i] = el}
               tabIndex={0}>
               <Link to={`/comics/${item.id}`}>
                  <img src={item.image} alt="comics" className="comics__img" />
                  <h3 className="comics__title">{item.title}</h3>
                  <div className="comics__price">{item.price}</div>
               </Link>
            </li>
         )
      })
      return (
         <ul className="comics__list">
            {items}
         </ul>
      )
   }



   return (
      <div className="comics">
         <div className="comics__wrapper">
            {setContent(process, () => renderItems(comicsList), newItemLoading)}

         </div>
         <button className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
         </button>
      </div >
   )
}

export default ComicsList;
