import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Selector from '../components/selector/Selector';

const setContent = (process, Component, data) => {
   switch (process) {
      case 'waiting':
         return <Selector />;
      case 'loading':
         return <Spinner />;
      case 'confirmed':
         return <Component data={data} />;
      case 'error':
         return <ErrorMessage />;
      default:
         throw new Error('Unexpected process state')
   }
}
export default setContent;