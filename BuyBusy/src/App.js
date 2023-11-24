import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import './App.css';

// Pages & Components imports
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';

// context imports 
import {ProductsContext} from './context/ProductsContext';
import { FiltesrContext } from './context/FiltersContext';
import { AuthContext } from './context/AuthContext';
import { CartContext } from './context/CartContext';

// const router = createBrowserRouter([
//   { 
//     path:"/",
//     element: <Navbar/>,
//     children: [
//       {
//         index: true,
//         element: <Home/>
//       },
//       {
//         path: "/signin",
//         element: <Signin/>
//       },
//       {
//         path: "/signup",
//         element: <Signup/>
//       }
//     ]
//   }
// ] 

//  )

function App() {
  return (
    <Router>
        <AuthContext>
          <FiltesrContext>
            <ProductsContext>
              <CartContext>
                <Navbar/>
                <ToastContainer autoClose={3000} />
                {/* <RouterProvider  > */}
                {/* <RouterProvider router={router}/> */}
                <Routes>
                  <Route path="*" element={(<Navbar/>)} />
                  <Route path="/" element={(<Home/>)} />
                  <Route path="/signin" element={(<Signin/>)} />
                  <Route path="/signup" element={(<Signup/>)} />
                  <Route path="/cart" element={(<Cart/>)} />
                  <Route path='/orders'  element={(<Orders/>)} />
                </Routes>
              </CartContext>
            </ProductsContext>
          </FiltesrContext>
        </AuthContext>
     </Router>
  );
}

export default App;
