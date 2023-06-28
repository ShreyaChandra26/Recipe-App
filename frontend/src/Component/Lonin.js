import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Lonin = (e) => {

  const navigate=useNavigate()
  const [inputdata, setinputdata]=useState({})
  const handelinput=(e)=>{
     const Name=e.target.name;
     const Value=e.target.value
     setinputdata({...inputdata, [Name]:Value})
  }

  const formdata1 = new FormData();
formdata1.append("email", inputdata.email);
formdata1.append("password", inputdata.password);


  const handelSubmit= async(e)=>{
    e.preventDefault();
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: inputdata.email,
          password: inputdata.password,
        }),
      });
      const datas = await response.json();

      console.log(datas)

      if (datas.token) {
        localStorage.setItem("jwt", datas.token);
        localStorage.setItem("User", JSON.stringify(datas.user));
      }

      if(datas.error==="inValid email or password"){
        alert("invalid attempt")
      }
      if(datas.user.message==="success"){
        alert("success")
        navigate("/CreateRecipi")
      }


    
      

  }


const Movetoregister=()=>{
     navigate("/register")
}

  return (
    <div>
<section className="vh-100" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" >
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" className="img-fluid"  />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterspacing:"1px"}}>Sign into your account</h5>

                  <div className="mb-4">
                  <label className="form-label" >Email address</label>
                    <input type="email" id="" onChange={handelinput} name='email' className="form-control form-control-lg" />
                   
                  </div>

                  <div className=" mb-4">
                  <label className="form-label"  >Password</label>
                  <input type="password" id="" onChange={handelinput} name='password' autoComplete='off' className="form-control" />
                     
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" onClick={handelSubmit} type="button">Login</button>
                  </div>
                  <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? 

                  <a href="" style={{color: "#393f81"}} onClick={Movetoregister} >Register here</a> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default Lonin
