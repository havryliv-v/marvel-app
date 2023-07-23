import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Selector from '../selector/Selector';

import './heroInfo.scss';

class HeroInfo extends Component {
   state = {
      hero: null,
      loading: false,
      error: false
   }

   marvelService = new MarvelService();

   componentDidMount() {
      this.updateHero();
   }

   componentDidUpdate(prevProps) {
      if (this.props.heroId !== prevProps.heroId) {
         this.updateHero();
      }
   }

   updateHero = () => {
      const { heroId } = this.props;
      if (!heroId) {
         return;
      }

      this.onHeroLoading();

      this.marvelService
         .getHero(heroId)
         .then(this.onHeroloaded)
         .catch(this.onError);

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



   render() {
      const { hero, loading, error } = this.state;

      const selector = hero || loading || error ? null : <Selector />
      const errorMessage = error ? <ErrorMessage /> : null;
      const spinner = loading ? <Spinner /> : null;
      const content = !(loading || error || !hero) ? <View hero={hero} /> : null;
      return (
         <div className="hero__info">
            {selector}
            {errorMessage}
            {spinner}
            {content}
         </div>
      )
   }
}

const View = ({ hero }) => {
   const { name, description, thumbnail, homepage, wiki, comics } = hero
   return (

      <div className="hero__info-inner">
         <div className="hero__basic">
            <img src={thumbnail} alt={name} />
            <div className="hero__basic-block">
               <div className="hero__basic-name">{name}</div>
               <div className="hero__basic-btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="hero__descr">{description}</div>
         <div className="hero__comics">Comics:</div>
         <ul className="hero__comics-list">
            {comics.length > 0 ? null : 'There is no comics with that person'}
            {
               comics.slice(0, 10).map((item, i) => {
                  return (<li key={i} className="hero__comics-item">{item.name}</li>)
               })
            }
         </ul>
      </div>

   )
}

export default HeroInfo;