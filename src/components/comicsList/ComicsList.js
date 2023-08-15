import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { useEffect, useState, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import { useLocaleStore } from '../../hooks/localStorage.hook';




const ComicsList = () => {
   const { getLocalInfo, pushToLocal } = useLocaleStore()
   const { loading, error, getAllComics } = useMarvelService()

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
      getAllComics(offset, trueLimit).then(onComicsListLoaded)
   }

   const onComicsListLoaded = (newRes) => {


      setComicsList(comicsList => [...comicsList, ...newRes])
      setOffset(offset => offset + 8)
      setnewItemLoading(false)
      setToggle(false)
      setLimit(limit => limit + 8)
      // pushToLocal(limit)
   }
   //------------------------------ Далі без змін
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
         const price = item.price === 0 ? 'NOT AVAILABLE' : item.price
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
               tabIndex={0}
            >
               <img src={item.image} alt="comics" className="comics__img" />
               <h3 className="comics__title">{item.title}</h3>
               <div className="comics__price">{price}</div>
            </li>
         )
      })
      return (
         <ul className="comics__list">
            {items}
         </ul>
      )
   }

   const items = renderItems(comicsList);
   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading && toggle ? <Spinner /> : null

   return (
      <div className="comics">
         <div className="comics__wrapper">
            {spinner}
            {errorMessage}
            {items}
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
