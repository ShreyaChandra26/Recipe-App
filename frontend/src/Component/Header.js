import React from 'react'
import logo from "../Image/Foodlogo.webp";
import "./header.css"

function Header() {
  return (
   <>
     <div id="header-part">
      <nav className="navbar fixed-top  navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <div>
        <img className='logo' src={logo}/>
        <span>
        <h4 className="aaa">RECIPE APP</h4>
        </span>
        </div> 
        {/* <div>
        <h4 className="aaaa">LogOut</h4>
        </div> */}
      </div>
    </nav>
    </div>
   </>
  )
}

export default Header
