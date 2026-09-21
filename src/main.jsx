import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import {Provider} from 'react-redux'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const route = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: <div>Home Screen</div>,
      },
      {
        path:"/login",
        element: <div>Login Screen</div>,

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
    </Provider>
  </StrictMode>,
)
