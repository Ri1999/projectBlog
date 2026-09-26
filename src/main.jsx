import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import {Provider} from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
// import PostCard from './components/PostCard.jsx'
import Login from './components/Login/Login.jsx'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx'

const route = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Home/>,
      },

      // testing for css POstCard.jsx
      // {
      //   path:"/postcard",
      //   element:<PostCard/>
      // },

      {
        path:"/login",
        element: <Login/>,

      },
      {
        path:"/forget-password",
        element: <ForgotPassword/>
      },
      {
        path:"/reset-password",
        element:<ResetPassword/>

      },
      {
        path:"/signup",
        element: <div>Signup Screen</div>,

      },
      {
        path: "/all-posts",
        element: <div>All Posts Screen</div>,

      },
      {
        path: "/add-post",
        element: <div>Add Post Screen</div>,

      },
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      {/* <App />
       */}
      <RouterProvider router={route} /> 
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </StrictMode>,
)
