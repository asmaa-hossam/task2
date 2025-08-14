import React from 'react'
import nodata from '../../../../assets/images/nodata.png'
export default function NoData() {
  return (
    <>
    <div className=' d-flex justify-content-between p-2 rounded-2 m-2 align-items-center' style={{backgroundColor:"rgba(226, 229, 235, 1)"}}>
     <p>Item Name</p>
     <p>Actions</p>
    </div>
      <div className='text-center'>
        <img src={nodata} alt="" />
        <h5 className=' my-3'>No Data !</h5>
        <p className=' text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      </div>
    </>
  )
}
