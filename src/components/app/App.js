import AppHeader from "../appHeader/AppHeader";

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicsPage = lazy(() => import('../pages/singleComicLayout/SingleComicsPage'));
const SingleHeroPage = lazy(() => import('../pages/singleHeroLayout/SingleHeroPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {

   return (
      <Router>
         <div className="app" >
            <AppHeader />
            <main>
               <Suspense fallback={<Spinner />}>
                  <Routes>
                     <Route path="/" element={<MainPage />} />
                     <Route path="/comics" element={<ComicsPage />} />
                     <Route path="/comics/:id" element={<SinglePage Component={SingleComicsPage} dataType='comic' />} />
                     <Route path="/heroes/:id" element={<SinglePage Component={SingleHeroPage} dataType='hero' />} />
                     <Route path="*" element={<Page404 />} />
                  </Routes>
               </Suspense>
            </main>
         </div>
      </Router>
   )
}

export default App;
