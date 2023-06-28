import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Registration from './Registration'
import CreateRecipy from './CreateRecipy'
import Addrecipy from './Addrecipy'
import RecipeDetails from './RecipeDetails'

function Routing() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registration />}/>
          <Route path='/CreateRecipi' element={<CreateRecipy />}/>
          <Route path='/Addrecipy' element={<Addrecipy />}/>
          <Route path='/RecipeDetails' element={<RecipeDetails />}/>

     
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routing
