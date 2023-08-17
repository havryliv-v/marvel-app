import { useEffect } from "react";
import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

   const { loading, request, error, clearError } = useHttp()
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=1bbbd260d1b69b36793cfcf355011419';
   const _baseOffsetHero = 440;
   const _limitHero = 9;
   const _baseOffsetComics = 400;
   const _limitComics = 8;


   const getAllHeroes = async (offset = _baseOffsetHero, limit = _limitHero) => {
      const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformHero)
   }
   const getHero = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformHero(res.data.results[0])
   }

   const getAllComics = async (offset = _baseOffsetComics, limit = _limitComics) => {
      const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformComics)

   }

   const getComic = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComics(res.data.results[0])
   }

   const _transformComics = (comics) => {
      return {
         id: comics.id,
         title: comics.title,
         description: comics.description || 'There is no description',
         pages: comics.pageCount ? `${comics.pageCount} p.` : 'No information about number of pages',
         image: comics.images[0].path + '.' + comics.images[0].extension,
         language: comics.textObjects.language || 'en-us',
         price: (comics.prices[0].price === 0) ? 'Price unavaliable' : `${comics.prices[0].price} $`
      }
   }


   const _transformHero = (hero) => {
      return {
         id: hero.id,
         name: hero.name,
         description: hero.description ? hero.description : 'Information about this hero was stolen by Hydra...',
         thumbnail: hero.thumbnail.path + '.' + hero.thumbnail.extension,
         homepage: hero.urls[0].url,
         wiki: hero.urls[1].url,
         comics: hero.comics.items
      }
   }
   return { loading, error, getAllHeroes, getHero, clearError, getAllComics, getComic }
}

export default useMarvelService;