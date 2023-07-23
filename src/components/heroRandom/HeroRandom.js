import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'

import './heroRandom.scss';



class HeroRandom extends Component {

   state = {
      hero: {},
      loading: true,
      error: false
   }

   marvelService = new MarvelService();


   componentDidMount() {
      this.updateHero();
   }

   componentWillUnmount() {
   }

   onError = () => {
      this.setState({
         loading: false,
         error: true
      })
   }

   onHeroloaded = (hero) => {
      this.setState({ hero, loading: false, error: false })
   }

   onHeroLoading = () => {
      this.setState({
         loading: true,
         error: false
      })
   }


   updateHero = () => {
      const id = Math.floor(Math.random() * (1011334 - 1009742) + 1009742);
      this.onHeroLoading()
      this.marvelService
         .getHero(id).then(this.onHeroloaded).catch(this.onError)
   }


   render() {
      const { hero, loading, error } = this.state;
      const errorMessage = error ? <ErrorMessage /> : null;
      const spinner = loading ? <Spinner /> : null;
      const content = !(loading || error) ? <View hero={hero} /> : null;

      return (
         <div className='randomhero'>
            {errorMessage}
            {spinner}
            {content}
            <div className="randomhero__static">
               <p className="randomhero__title">Random character for today! <br />
                  Do you want to get to know him better?</p>
               <p className="randomhero__title">Or choose another one
               </p>
               <button className="button button__main" onClick={this.updateHero}>
                  <div className="inner" >try it</div>
               </button>
               <img src={mjolnir} alt="hero-img" className="randomhero__decor" />

            </div>
         </div>
      )
   }
}

const View = ({ hero }) => {

   const { name, thumbnail, description, homepage, wiki } = hero;
   let contain = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ? 'randomhero__contain' : '';
   let descrShorter = description.length >= 227 ? `${description.slice(0, 227)}...` : description
   return (
      <div className="randomhero__block">
         <img src={thumbnail} alt="hero-img" className={`randomhero__img , ${contain}`} />
         <div className="randomhero__info">
            <p className='randomhero__name'>{name}</p>
            <p className="randomhero__text">{descrShorter}</p>
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
   )
}

export default HeroRandom;