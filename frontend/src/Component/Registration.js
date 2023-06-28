import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Registration() {
const [post, setpost]=useState({})
const navigate=useNavigate()


const handelinput=(e)=>{
  const inputval=e.target.value;
  const inputName=e.target.name
  setpost({...post, [inputName]:inputval})

}

const formdata1 = new FormData();
formdata1.append("username", post.username);
formdata1.append("email", post.email);
formdata1.append("password", post.password);

const handelsubmit=(e)=>{
  e.preventDefault();
  if (post.password !== post.ConformPass) {
  console.log("Password does not match");
  } else
    axios.post("http://localhost:8000/signup", formdata1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata1),
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
        alert(data.data);
        if(data.data=="successfull"){
               navigate("/")
        }
        
        }
      })
      .catch((error) => {
        return error;
      });

}


  return (
    <div>
    <Header />
      <div>
      <section className="vh-100" style={{backgroundcolor:"#eee"}}>
  <div className="container h-100" >
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11" style={{width:"80%"}} >
        <div className="card text-black" style={{borderradius: "25px", height:"107%"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{marginTop:"-75px"}}>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="flex-fill mb-0">
                    <label className="" >Your Name</label>
                      <input type="text" id="" onChange={handelinput} name='username' autoComplete='off' className="form-control" />
                     
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className=" flex-fill mb-0">
                    <label className="" >Your Email</label>
                      <input type="text" id="" onChange={handelinput} name='email' autoComplete='off' className="form-control" />
                   
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className=" flex-fill mb-0">
                    <label className=""  >Password</label>
                      <input type="password" id="" onChange={handelinput} name='password' autoComplete='off' className="form-control" />
                     
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="flex-fill mb-0">
                    <label className="" >Repeat your password</label>
                      <input type="password" id="" onChange={handelinput} name='ConformPass' className="form-control" />
                      
                    </div>
                  </div>


                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={handelsubmit} className="btn btn-primary btn-lg">Register</button>
                  </div>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{marginTop:"-30px"}}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                alt="login form" className="img-fluid" style={{borderradius: "1rem 0 0 1rem", height:"500px", width:"100%"}} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
    </div>
  )
}

export default Registration
