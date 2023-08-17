import { useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicsPage.scss';


const SingleComicsPage = () => {

   const { comicId } = useParams();
   const [comic, setComic] = useState(null);

   const { error, loading, getComic, clearError } = useMarvelService();

   useEffect(() => {
      updateComic();
   }, [comicId])



   const updateComic = () => {
      clearError()
      getComic(comicId)
         .then(onComicloaded)
   }

   const onComicloaded = (comic) => {
      setComic(comic)
   }

   const errorMessage = error ? <ErrorMessage /> : null;
   const spinner = loading ? <Spinner /> : null;
   const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
   return (
      <>
         {errorMessage}
         {spinner}
         {content}
      </>
   )



}

const View = ({ comic }) => {
   const { title, description, pageCount, price, image, language } = comic;
   return (
      <div className="single">
         <img src={image} alt={title} className="single__img" />
         <div className="single__block">
            <div className="single__title">{title}</div>
            <div className="single__descr">{description}</div>
            <div className="single__pages">{pageCount}</div>
            <div className="single__language">{language}</div>
            <div className="single__price">{price}</div>
         </div>
         <Link to='/comics' className="single__back"><div>Back to all</div></Link>

      </div>
   )
}

export default SingleComicsPage;