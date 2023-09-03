import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


import './singleHeroPage.scss';

const SingleHeroPage = ({ data }) => {

   const { name, description, thumbnail, homepage, wiki } = data

   return (
      <div className="singleHero__page">
         <Helmet>
            <meta
               name="description"
               content={`${name} - hero`} />
            <title>{`Marvel hero - ${name}`}</title>
         </Helmet>
         <div className="singleHero__inner">
            <img src={thumbnail} alt="hero" className="singleHero__img" />
            <div className="singleHero__content">
               <div className="singleHero__name">{name}</div>
               <div className="singleHero__descr">{description}</div>
               <div className="singleHero__btns">
                  <a href={homepage} className="button button__main">
                     <div className="inner">Homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">Wiki</div>
                  </a>
               </div>
            </div>
         </div>
         <Link to='/' className="singleHero__back">
            <button className="button button__main" type="button" >
               <div className="inner" >BACK</div>
            </button>
         </Link>
      </div>
   )
}

export default SingleHeroPage;