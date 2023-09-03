import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet'


const Page404 = () => {
   console.log(document.referrer)

   const navigate = useNavigate();
   const reff = document.referrer
   console.log(reff)
   const goBack = () => {
      navigate(-1);
   };
   return (
      <div>
         <Helmet>
            <meta
               name="description"
               content={`page with error`} />
            <title>{`Error 404`}</title>
         </Helmet>
         <ErrorMessage />
         <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>This page doesn’t exist</p>
         <Link
            style={{ 'display': 'block' }}
            onClick={goBack}
         > <button
            className="button button__main button__long"
            style={{ 'textTransform': 'none', 'fontSize': '24px' }}>
               <div className="inner">Go back</div>
            </button></Link>

      </div>
   )
}

export default Page404;