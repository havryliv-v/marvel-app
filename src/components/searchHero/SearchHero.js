import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './searchHero.scss'
import { useState } from 'react';

const setContent = (status, View, heroName) => {
   switch (status) {
      case 'empty':
         return 'This field is required';
      case 'error':
         return 'The character was not found. Check the name and try again';
      case 'found':
         return <View heroName={heroName} />
   }
}

const SearchHero = () => {
   const { getHeroByName, process, setProcess } = useMarvelService();
   const [heroName, setHeroName] = useState('')
   const [status, setStatus] = useState('')

   const onRequest = () => {
      if (heroName === '') {
         return setStatus('empty')
      }
      getHeroByName(heroName).then((response) => {
         if (response) {
            setStatus('found')
         }
      })
         .then(() => setProcess('confirmed'))
         .catch((error) => {
            setStatus('error');
            setProcess('error')
         })

   }

   const handleInput = (e) => {
      setHeroName(e.target.value)
      setStatus('');
   }

   return (
      <Formik
         initialValues={{
            hero: ''
         }}
         onSubmit={onRequest}
      >
         <Form className='form'>
            <h2 className='form__title'>Or find a character by name:</h2>
            <div className="form__main">
               <Field
                  className='form__input'
                  id="hero"
                  name="hero"
                  type="text"
                  placeholder="Enter name"
                  onChange={e => { handleInput(e) }}
                  value={heroName}
               />
               <button className="button button__main" disabled={process === 'loading'} type="submit" >
                  <div className="inner" >FIND</div>
               </button>
            </div>
            <div className={`form__status ${(status === 'found') ? 'form__green' : null}`}>
               {setContent(status, View, heroName)}
            </div>
         </Form>
      </Formik>
   )
}

const View = ({ heroName }) => {
   return (
      <div className='view'>
         <p>There is! Visit {heroName} page?</p>
         <Link to={`/heroes/${heroName}`}>
            <button className="button button__secondary" type="button" >
               <div className="inner" >TO PAGE</div>
            </button>
         </Link>
      </div >
   )
}

export default SearchHero;