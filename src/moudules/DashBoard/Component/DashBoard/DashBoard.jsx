import React from 'react'
import Headers from '../../../Shared/Components/Header/Headers'

export default function DashBoard({loginData}) {
  return (
    <>
      <Headers title1={'Welcome'} title2={loginData.userName} 
      description={'this is a welcoming screen for the entry of the application , you can now see the options'}
      />'
    </>
  )
}
