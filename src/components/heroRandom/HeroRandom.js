import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import './heroRandom.scss';

import mjolnir from '../../resources/img/mjolnir.png';

class HeroRandom extends Component {
   constructor(props) {
      super(props);
      this.updateHero();
   }

   state = {
      hero: {},
   }

   marvelService = new MarvelService();


   onHeroloaded = (hero) => {
      this.setState({ hero })
   }

   updateHero = () => {
      const id = Math.floor(Math.random() * (1011334 - 1009742) + 1009742);
      this.marvelService
         .getHero(id).then(this.onHeroloaded)
   }


   render() {
      const { hero: { name, thumbnail, description, homepage, wiki } } = this.state


      return (
         <div className='randomhero'>
            <div className="randomhero__block">
               <img src={thumbnail} alt="hero-img" className="randomhero__img" />
               <div className="randomhero__info">
                  <p className='randomhero__name'>{name}</p>
                  <p className="randomhero__text">{description}</p>
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
            <div className="randomhero__static">
               <p className="randomhero__title">Random character for today! <br />
                  Do you want to get to know him better?</p>
               <p className="randomhero__title">Or choose another one
               </p>
               <button className="button button__main">
                  <div className="inner">try it</div>
               </button>
               <img src={mjolnir} alt="hero-img" className="randomhero__decor" />

            </div>
         </div>
      )
   }
}

export default HeroRandom;