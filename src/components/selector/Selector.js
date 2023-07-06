import './selector.scss';

const Selector = () => {
   return (
      <div className="selector">
         <h2 className="selector__title">Please select a character to see information</h2>
         <div className="selector__body">
            <div className="selector__circle"></div>
            <div className="selector__mini"></div>
            <div className="selector__block"></div>
            <div className="selector__block"></div>
            <div className="selector__block"></div>
         </div>
      </div>
   )
}

export default Selector;