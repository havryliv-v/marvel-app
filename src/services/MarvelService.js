class MarvelService {
   _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   _apiKey = 'apikey=1bbbd260d1b69b36793cfcf355011419';
   _baseOffsetHero = 440;
   _limit = 9;

   getResource = async (url) => {
      let res = await fetch(url);
      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   }
   getAllHeroes = async (offset = this._baseOffsetHero, limit = this._limit) => {
      const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
      return res.data.results.map(this._transformHero)
   }
   getHero = async (id) => {
      const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
      return this._transformHero(res.data.results[0])
   }

   _transformHero = (hero) => {
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

}

export default MarvelService;