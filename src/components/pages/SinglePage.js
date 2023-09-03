import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';


import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {

   const { id } = useParams();
   const [data, setData] = useState(null);
   const { getHeroByName, getComic, clearError, process, setProcess } = useMarvelService();

   useEffect(() => {
      updateData();
   }, [id])

   const updateData = () => {
      clearError()
      switch (dataType) {
         case 'comic':
            getComic(id).then(onDataLoaded)
               .then(() => setProcess('confirmed'))
               .catch(error => console.error(error));
            break;
         case 'hero':
            getHeroByName(id).then(onDataLoaded)
               .then(() => setProcess('confirmed'))
               .catch(error => console.error(error));
            break;
      }
   }

   const onDataLoaded = (data) => {
      setData(data)
   }


   return (
      <>
         <AppBanner />
         {setContent(process, Component, data)}
      </>
   )
}

export default SinglePage;