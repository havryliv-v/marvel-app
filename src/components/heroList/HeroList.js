import './heroList.scss';
import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';



class HeroList extends Component {
   state = {
      list: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 440,
      heroesEnded: false,
      limit: 9
   }


   marvelService = new MarvelService();

   componentDidMount() {
      // window.addEventListener('scroll', this.handleScroll)
      if (localStorage.getItem('heroLimit')) {
         let heroLimit = JSON.parse(localStorage.getItem('heroLimit'))
         this.onRequest(this.state.offset, heroLimit)
         this.setState({
            offset: (this.state.offset - this.state.limit) + heroLimit,
            limit: heroLimit
         })
      }
      else {
         this.onRequest();
      }


   }

   // handleScroll = () => {
   //    if (this.state.newItemLoading) return
   //    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
   //       this.onRequest(this.state.offset)
   //    }
   //    if (this.state.charEnded)
   //       window.removeEventListener("scroll", this.onScroll);
   // }

   componentWillUnmount() {
      // window.removeEventListener('scroll', this.handleScroll);
   }

   onRequest = (offset, limit) => {
      this.onHeroListloading();
      this.marvelService.getAllHeroes(offset, limit)
         .then(this.onHeroListLoaded)
         .catch(this.onError)
   }

   onHeroListloading = () => {
      this.setState({
         newItemLoading: true
      })
   }

   onHeroListLoaded = (newList) => {
      let ended = false;
      if (newList.length < 9) {
         ended = true;
      }
      localStorage.setItem('heroLimit', JSON.stringify(this.state.limit))
      this.setState(({ offset, list, limit }) => ({
         list: [...list, ...newList],
         loading: false,
         newItemLoading: false,
         offset: offset + 9,
         heroesEnded: ended,
         limit: limit + 9
      }))
   }

   onError = () => {
      this.setState({
         error: true,
         loading: false
      })
   }

   itemRefs = [];

   setRef = (ref) => {
      this.itemRefs.push(ref);
   }

   itemFocus = (id) => {
      this.itemRefs.forEach(item => {
         item.classList.remove('hero__item_selected')
      });
      this.itemRefs[id].classList.add('hero__item_selected');
      this.itemRefs[id].focus();
   }

   renderItems(arr) {

      const items = arr.map((item, i) => {
         return (
            <li ref={this.setRef}
               tabIndex={0}
               className="hero__item"
               key={item.id}
               onClick={() => { this.props.onHeroSelected(item.id); this.itemFocus(i) }}
               onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                     e.preventDefault();
                     this.props.onHeroSelected(item.id);
                     this.itemFocus(i)
                  }
               }}>
               <img src={item.thumbnail} alt="" className="hero__img" />
               <div className="hero__name">{item.name}</div>
            </li >
         )
      })
      return (<ul className="hero__list" >
         {items}
      </ul >)
   }

   render() {

      const { list, loading, error, offset, newItemLoading, heroesEnded } = this.state;
      const items = this.renderItems(list);
      const errorMessage = error ? <ErrorMessage /> : null;
      const spinner = loading ? <Spinner /> : null;
      const content = !(loading || error) ? items : null;
      const alternativeStyle = content ? {} : { 'justifyContent': 'flex-end' };
      const alternativeButton = content ? {} : { 'marginTop': '70%' }
      const hiddenButton = { 'display': heroesEnded ? 'none' : 'block' }

      return (
         <div className='hero' style={alternativeStyle}>
            {errorMessage}
            {spinner}
            {content}
            <button
               className="button button__main button__long"
               disabled={newItemLoading}
               style={{ ...alternativeButton, ...hiddenButton }}
               onClick={() => this.onRequest(offset)}>
               <div className="inner">load more</div>
            </button>
         </div >
      )
   }
}

export default HeroList;