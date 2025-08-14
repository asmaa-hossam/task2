import React from 'react'
import girl from '../../../../assets/images/gilrphoto.png'
import navboy from '../../../../assets/images/navboy.png'
import { useLocation } from 'react-router-dom'


export default function Headers({title1,title2,description}) {
let{pathname}=useLocation()

  return (
    <>
      <div className="container m-4 rounded-5" style={{backgroundColor:'rgba(0, 146, 71, 1)',height:"200px",backgroundImage:"url(/circle.svg)",backgroundSize:"cover"}}>
       <div className="row  align-items-center  justify-content-between p-3 rounded-3" >
        <div className="col-md-8 ">
         <div className=''>
          <h4 className='text-light'>{title1} <span className=' fw-light text-light'>{title2}</span></h4>
          <p className='text-light'>{description}</p>
         </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end ">
         <img src={pathname==='/dashBoard'?girl:navboy} alt="" className=' w-50 ' />
        </div>
       </div>
      </div>
    </>
  )
}
