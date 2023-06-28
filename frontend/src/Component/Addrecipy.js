import React, { useState } from 'react'
import logo from "../Image/Foodlogo.webp";
import "./CreateRecipy.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Addrecipy() {

    const navigate=useNavigate()
    const [inputsdata, setinputdata]=useState({})
    const handelinput=(e)=>{
        const inputvalue=e.target.value;
        const Name=e.target.name;
        setinputdata({...inputsdata, [Name]:inputvalue})

    }

    const handelprice=(e)=>{
        const inputvalue= parseInt(e.target.value);
        const Name=e.target.name;
        setinputdata({...inputsdata, [Name]:inputvalue})

    }
    const handelsubmits=(e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/addrecipe", inputsdata, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputsdata),
          })
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
            alert(data.data);
            if(data.data==="successfull"){
                   navigate("/CreateRecipi")
            }
            }
          })
          .catch((error) => {
            return error;
          });

    }

  return (
    <div>

<div id="header-part">
      <nav className="navbar fixed-top  navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <div>
        <img className='logo' src={logo}/>
        <span>
        <h4 className="aaa">RECIPE APP</h4>
        </span>
        </div> 
        <div>
        <h4 className="aaaa">LogOut</h4>
        </div>
      </div>
    </nav>
 </div>
    
    <div className="container" style={{marginTop:"80px", width:"50%", border:"2px solid"}}>
        <h2 style={{marginLeft:"12%", color:"blue"}}>Create a recipe </h2>
        <hr></hr>
        <h4>Share a recipe with the club by completing the below form</h4>


    <div class="form-group row" style={{marginTop:"2px"}}>
    <label for="inputEmail3" class="col-sm-2 col-form-label">Author</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3" onChange={handelinput} name='Author' />
    </div>
  </div>

    <div class="form-group row" style={{marginTop:"8px"}}>
    <label for="inputEmail3" class="col-sm-2 col-form-label">Recipe title</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3" onChange={handelinput} name='RecipeTitel' />
    </div>
    </div>


    <div class="form-group row" style={{marginTop:"8px"}}>
    <label for="inputEmail3" class="col-sm-2 col-form-label">Price</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputEmail3" onChange={handelprice} name='price' />
    </div>
  </div>

    <div class="form-group row" style={{marginTop:"8px"}}>
    <label for="inputEmail3" class="col-sm-2 col-form-label">Image Address URL</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3"  onChange={handelinput} name='imgurl' />
    </div>
  </div>
   
<div class="form-group row" style={{marginTop:"8px"}}>
<label for="inputEmail3" class="col-sm-2 col-form-label">Ingredients</label>
  <div className="col-sm-10">
    <textarea className="form-control" id="form4Example3" name='ingredients' onChange={handelinput} rows="4"></textarea>
  </div>
  </div>


  <div class="form-group row" style={{marginTop:"8px"}}>
  <label for="inputEmail3" class="col-sm-2 col-form-label">Recipe Direction</label>
  <div className="col-sm-10">
    <textarea className="form-control" id="form4Example3" name='directions' onChange={handelinput} rows="4"></textarea>
  </div>
  </div>


  <button type="submit" className="btn btn-primary btn-block mb-4" style={{width:"100px",  marginTop:"10px"}} onClick={handelsubmits} >Send</button>
 </div>


</div>
  )
}

export default Addrecipy
