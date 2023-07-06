import './comicsList.scss';

import xMen from '../../resources/img/x-men.png';
import uw from '../../resources/img/UW.png';



const ComicsList = () => {
   return (
      <div className="comics">
         <ul className="comics__list">
            <li className="comics__item">
               <img src={xMen} alt="comics" className="comics__img" />
               <h3 className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h3>
               <div className="comics__price">9.99$</div>
            </li>
            <li className="comics__item">
               <img src={uw} alt="comics" className="comics__img" />
               <h3 className="comics__title">X-Men: Days of Future Past</h3>
               <div className="comics__price">NOT AVAILABLE</div>
            </li>
            <li className="comics__item">
               <img src={xMen} alt="comics" className="comics__img" />
               <h3 className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h3>
               <div className="comics__price">9.99$</div>
            </li>
            <li className="comics__item">
               <img src={uw} alt="comics" className="comics__img" />
               <h3 className="comics__title">X-Men: Days of Future Past</h3>
               <div className="comics__price">NOT AVAILABLE</div>
            </li>
            <li className="comics__item">
               <img src={xMen} alt="comics" className="comics__img" />
               <h3 className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h3>
               <div className="comics__price">9.99$</div>
            </li>
            <li className="comics__item">
               <img src={uw} alt="comics" className="comics__img" />
               <h3 className="comics__title">X-Men: Days of Future Past</h3>
               <div className="comics__price">NOT AVAILABLE</div>
            </li>
            <li className="comics__item">
               <img src={xMen} alt="comics" className="comics__img" />
               <h3 className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</h3>
               <div className="comics__price">9.99$</div>
            </li>
            <li className="comics__item">
               <img src={uw} alt="comics" className="comics__img" />
               <h3 className="comics__title">X-Men: Days of Future Past</h3>
               <div className="comics__price">NOT AVAILABLE</div>
            </li>
         </ul>
         <button className="button button__main button__long">
            <div className="inner">load more</div>
         </button>
      </div >
   )
}

export default ComicsList;