import './appBanner.scss';


import avengers from '../../resources/img/Avengers.png';
import avengers_logo from '../../resources/img/Avengers_logo.png';

const AppBanner = () => {
   return (
      <div className="banner">
         <img src={avengers} alt="avengers" className="banner__avengers" />
         <p className='banner__text'>New comics every week!<br />
            Stay tuned!</p>
         <img src={avengers_logo} alt="avengers_logo" className="banner__logo" />
      </div>
   )
}

export default AppBanner;