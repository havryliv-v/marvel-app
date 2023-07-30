import { useState } from "react";


// import AppBanner from "../appBanner/AppBanner";
import AppHeader from "../appHeader/AppHeader";
// import ComicsList from "../comicsList/ComicsList";
// import SingleComics from "../singleComics/SingleComics";
import HeroInfo from '../heroInfo/HeroInfo';
import HeroList from '../heroList/HeroList';
import HeroRandom from '../heroRandom/HeroRandom';
// import Selector from "../selector/Selector";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const App = () => {
   const [selectedHero, setHero] = useState(null);



   const onHeroSelected = (id) => {
      setHero(id);
   }
   return (
      <div className="app" >
         <AppHeader />
         <main>
            <ErrorBoundary>
               <HeroRandom />
            </ErrorBoundary>
            {/* <AppBanner /> */}
            <div className="hero__content">
               <ErrorBoundary>
                  <HeroList onHeroSelected={onHeroSelected} />
               </ErrorBoundary>
               <ErrorBoundary>
                  <HeroInfo heroId={selectedHero} />
               </ErrorBoundary>
               {/* <Selector /> */}
               {/* <ComicsList /> */}
               {/* <SingleComics /> */}
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
         </main>
      </div>
   )
}

export default App;





   // componentDidMount() {
   //    // window.addEventListener('scroll', this.handleScroll)
   //    if (localStorage.getItem('heroLimit')) {
   //       let heroLimit = JSON.parse(localStorage.getItem('heroLimit'))
   //       this.onRequest(this.state.offset, heroLimit)
   //       this.setState({
   //          offset: (this.state.offset - this.state.limit) + heroLimit,
   //          limit: heroLimit
   //       })
   //    }
   //    else {
   //       this.onRequest();
   //    }


   // }

   // handleScroll = () => {
   //    if (this.state.newItemLoading) return
   //    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
   //       this.onRequest(this.state.offset)
   //    }
   //    if (this.state.charEnded)
   //       window.removeEventListener("scroll", this.onScroll);
   // }

   // componentWillUnmount() {
   //    window.removeEventListener('scroll', this.handleScroll);
   // }



         // localStorage.setItem('heroLimit', JSON.stringify(limit))
