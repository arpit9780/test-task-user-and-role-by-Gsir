import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IndexRoute } from './Routes';

function App() {
  return (
    <div>
       <IndexRoute />
      <ToastContainer />
    </div>
  );
}

export default App;
