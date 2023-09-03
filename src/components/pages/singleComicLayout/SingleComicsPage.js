import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


import './singleComicsPage.scss';

const SingleComicsPage = ({ data }) => {

   const { title, description, pageCount, price, image, language } = data;

   return (
      <div className="single">
         <Helmet>
            <meta
               name="description"
               content={`${title} comics book`} />
            <title>{title}</title>
         </Helmet>
         <img src={image} alt={title} className="single__img" />
         <div className="single__block">
            <div className="single__title">{title}</div>
            <div className="single__descr">{description}</div>
            <div className="single__pages">{pageCount}</div>
            <div className="single__language">{language}</div>
            <div className="single__price">{price}</div>
         </div>

         <Link to='/' className="singleHero__back"><button className="button button__main" type="button" >
            <div className="inner" >BACK</div>
         </button>
         </Link>
      </div>
   )
}

export default SingleComicsPage;