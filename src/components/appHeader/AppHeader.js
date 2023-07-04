import './appHeader.scss';

const AppHeader = () => {
   return (
      <header className='header'>
         <h1 className="header__title">
            <a href="http://localhost:3000/" ><span>Marvel</span> information portal</a>
         </h1>
         <nav className="header__menu">
            <ul>
               <li><a href="http://localhost:3000/">Characters</a></li>
               /
               <li><a href="http://localhost:3000/">Comics</a></li>
            </ul>
         </nav>
      </header>
   )
}

export default AppHeader;