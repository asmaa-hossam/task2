
    import React, { useEffect, useState } from 'react'
    import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AuthLayout from './moudules/Shared/Components/AuthLayout/AuthLayout'
import Login from './moudules/Authontication/Components/Login/Login'
import Register from './moudules/Authontication/Components/Register/Register'
import ForgetPass from './moudules/Authontication/Components/ForgetPass/ForgetPass'
import ResetPass from './moudules/Authontication/Components/ResetPass/ResetPass'
import VerifyAccount from './moudules/Authontication/Components/VerifyAccount/VerifyAccount'
import MasterLayout from './moudules/Shared/Components/MasterLayout/MasterLayout'
import CategoriesList from './moudules/Categories/Component/CategoriesList/CategoriesList'
import CategoryData from './moudules/Categories/Component/CategoryData/CategoryData'
import FavList from './moudules/Favourites/Components/FavList/FavList'
import DashBoard from './moudules/DashBoard/Component/DashBoard/DashBoard'
import RecipesList from './moudules/Recipes/Components/RecipesList/RecipesList'
import ResipesData from './moudules/Recipes/Components/ResipesData/ResipesData'
import UsersList from './moudules/Users/Components/UsersList/UsersList'
import NotFound from './moudules/Shared/Components/NotFound/NotFound'
import { jwtDecode } from 'jwt-decode';
import ProtectedRout from './moudules/Shared/Components/ProtectedRout/ProtectedRout';
   import { ToastContainer } from 'react-toastify';

export default function App() {
         let[loginData,setLoginData]= useState(null);

    function getlogedUserData(){
      
 let encodeToken=localStorage.getItem("token");
  let deCodeData=jwtDecode(encodeToken);
  setLoginData(deCodeData);
      
 
}
function logOutUser(){
  localStorage.clear();
  setLoginData(null);
  <Navigate to='/Login'/>
}

    const routs=createBrowserRouter([
      {path:"",
        element:<AuthLayout/>,
         errorElement:<NotFound/>,
         children:[
       {path:'/',element:<Login getlogedUserData={getlogedUserData}/>},
       { path:'login',element:<Login getlogedUserData={getlogedUserData}/>},
         { path:"register",element:<Register/>},
         { path:"forgetPass",element:<ForgetPass/>},
          {path:"resetPass",element:<ResetPass/>},
          {path:"verifyAccount",element:<VerifyAccount/>}
        
      ]},
     {
      path:"dashBoard",
      element:<ProtectedRout loginData={loginData}><MasterLayout  logOutUser={logOutUser} loginData={loginData}/></ProtectedRout>, 
      errorElement:<NotFound/>,
      children:[
       {index:true,element:<DashBoard loginData={loginData}/>},
        {path:'recipes',element:<RecipesList/>},
          {path:"category",element:<CategoriesList/>},
         { path:"categoryData",element:<CategoryData/>},
          {path:"favourite",element:<FavList/>},
         { path:"recipeData",element:<ResipesData/>}
          ,{ path:"users",element:<UsersList/>}

        
      ]
     } ])
     useEffect(()=>{
    if(localStorage.getItem("token")){
      getlogedUserData()
    }
     },[])

      return (
        <div>
        <RouterProvider router={routs}></RouterProvider>
        <ToastContainer/>
        </div>
      )
    }
    