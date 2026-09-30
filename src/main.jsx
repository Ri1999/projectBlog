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
import AboutUs from './components/Footer/Info/AboutUs.jsx'
import ContactUs from './components/Footer/Info/ContactUs.jsx'
import Faqs from './components/Footer/Info/Faqs.jsx'
import ShareFeedback from './components/Footer/Info/ShareFeedback.jsx'
import TermsAndConditions from './components/Footer/Info/TermsAndConditions.jsx'
import PrivacyPolicy from './components/Footer/Info/PrivacyPolicy.jsx'
// import SignUp from './components/Login/Signup/SignUp.jsx'
import Signup from './components/Signup/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'
const route = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <Home/>, // home have <Public/> component 
      },

      // testing for css POstCard.jsx
      // {
      //   path:"/postcard",
      //   element:<PostCard/>
      // },

      // --- footer items starts ---
      {
        path:"/about-us",
        element:<AboutUs/>

      },
      {
        path:"/contact-us",
        element:<ContactUs/>
      },
      {
        path:"/faqs",
        element: <Faqs/>
      },

      {
        path:"/feedback",
        element: <ShareFeedback/>
      },
      {
        path:"/terms",
        element:<TermsAndConditions/>
      },
      {
        path:"/privacy-policy",
        element:<PrivacyPolicy/>
      },




      // --- footer items ends ---
      {
        path:"/login",
        element: (
        <AuthLayout authentication={false} >
          <Login/>
        </AuthLayout>),

      },
      // {
      //   path:"/singup",
      //   element:
      // },
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
        element: (
          <AuthLayout authentication={false} >
            <Signup/>
          </AuthLayout>
        ),

      },
      {
        path: "/all-posts",
        element: (
        <AuthLayout authentication={true} >
          <div>All Posts Screen</div>
        </AuthLayout>),

      },
      {
        path: "/add-post",
        element: (
        <AuthLayout>
          <div>Add Post Screen</div>
        </AuthLayout>),

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
