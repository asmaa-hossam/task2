import axios from "axios";

 export const axiosInstant=axios.create({baseURL:"https://upskilling-egypt.com:3006/api/v1/",
    headers:{Authorization:localStorage.getItem("token")}})


 //USERS URLS
export const USERS_URLS={
    LOGIN:`Users/Login`,
    RESET_PASS:`Users/Reset`,
    FORGET_PASS:`Users/Reset/Request`,
    DELETE_USER:(id)=>`Users/${id}`,
    GET_USERS:(pageSize,pageNum)=>`Users/`
 }

  //CATEGORIES URLS
export const CATEGORIES_URLS={
    GET_CATEGORIES:(pageSize,pageNum,name,categoryId)=>`Category/`,
    DELEATE_CATEGORY:(id)=>`Category/${id}`
 }
//CATEGORIES URLS
export const RECIPES_URLS={
    GET_RECIPE:(pageSize,pageNum,name,userName)=>`Recipe/`,
    DELEATE_RECIPE:(id)=>`Recipe/${id}`
 }
