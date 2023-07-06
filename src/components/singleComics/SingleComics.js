import './singleComics.scss';

import xMen from '../../resources/img/x-men.png';

const SingleComics = () => {
   return (
      <div className="single">
         <img src={xMen} alt="comics" className="single__img" />
         <div className="single__block">
            <div className="single__title">X-Men: Days of Future Past</div>
            <div className="single__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</div>
            <div className="single__pages">144 pages</div>
            <div className="single__language">Language: en-us</div>
            <div className="single__price">9.99$</div>
         </div>
         <a href="http://localhost:3000/" className="single__back"><div>Back to all</div></a>

      </div>
   )
}

export default SingleComics;