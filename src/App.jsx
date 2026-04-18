import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import MasterLayout from './layouts/MasterLayout/MasterLayout'
import ForgetPass from './modules/Authentication/Components/ForgetPass/ForgetPass'
import Login from './modules/Authentication/Components/Login/Login'
import Register from './modules/Authentication/Components/Register/Register'
import ResetPass from './modules/Authentication/Components/ResetPass/ResetPass'
import VerifyAccount from "./modules/Authentication/Components/VerifyAccount/VerifyAccount"
import CategoriesList from "./modules/Categories/Components/CategoriesList/CategoriesList"
import Dashboard from './modules/Dashboard/Components/Dashboard/Dashboard'
import FavList from "./modules/Favourites/Components/FavList/FavList"
import RecipeData from "./modules/Recipes/Components/RecipeData/RecipeData"
import RecipesList from "./modules/Recipes/Components/RecipesList/RecipesList"
import NotFound from './modules/Shared/Components/NotFound/NotFound'
import UsersList from "./modules/Users/Components/UsersList/UsersList"
import ProtectedRoutes from './routes/ProtectedRoutes/ProtectedRoutes'

function App() {

  const routes = createBrowserRouter([
    // Auth Routes
    {path:"/",
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
      children: [
        {index:true,element:<Login/>},
        {path:"login",element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"forget-pass",element:<ForgetPass/>},
        {path:"reset-pass",element:<ResetPass/>},
        {path:"verify-acc",element:<VerifyAccount/>},
      ],
    },
    // Master Routes
    {
      path:"dashboard",
      element:(
        <ProtectedRoutes>
          <MasterLayout/>
        </ProtectedRoutes>
      ),
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Dashboard/>},
        {path:"",element:<Dashboard/>},
        {path:"users",element:<UsersList/>},
        {path:"recipes",element:<RecipesList/>},
        {path:"recipe-data",element:<RecipeData/>},
        {path:"categories",element:<CategoriesList/>},
        {path:"favorites",element:<FavList/>},
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
