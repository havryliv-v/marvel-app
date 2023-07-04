import './heroRandom.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

const HeroRandom = () => {
   return (
      <div className='randomhero'>
         <div className="randomhero__block">
            <img src={thor} alt="hero-img" className="randomhero__img" />
            <div className="randomhero__info">
               <p className='randomhero__name'>THOR</p>
               <p className="randomhero__text">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
               <div className="randomhero__btns">
                  <a href="http://localhost:3000/" className="button button__main">
                     <div className="inner">homepage</div>
                  </a>
                  <a href="http://localhost:3000/" className="button button__secondary">
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

export default HeroRandom;