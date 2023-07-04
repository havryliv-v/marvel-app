import './heroList.scss';
import abyss from '../../resources/img/abyss.jpg';

const HeroList = () => {
   return (
      <div className='hero__wrapper'>
         <ul className="hero__list">
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item hero__item_selected">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
            <li className="hero__item">
               <img src={abyss} alt="" className="hero__img" />
               <div className="hero__name">ABYSS</div>
            </li>
         </ul>
         <button className="button button__main button__long">
            <div className="inner">load more</div>
         </button>
      </div>
   )
}

export default HeroList;