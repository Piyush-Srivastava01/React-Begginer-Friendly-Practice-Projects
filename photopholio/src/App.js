import Navbar from './components/Navbar/Navbar';
import AlbumList from './components/AlbumList/AlbumList';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <AlbumList />
    </>
  );
}

export default App;
