import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useRazorpay from "react-razorpay";

function Modal({ closeModel, itemdetails }) {
  const [TotalPrice, setTotalPrice] = useState(0);

  const RazorPay = useRazorpay();
  const razorPayDisplay = useCallback(async (total)=> {
      const options = {
          key: "rzp_test_oJuh89AEOZoQfe",
          amount: total*100,
          currency: "INR",
          name: "Ms.Store",
          description: "Gaming Transaction",
          handler: (res)=> {
              console.log(res);
          },
          prefill: {
              name: "Shreya Chandra",
              email: "gudiyamehta009@gmail.com",
              contact: "6206712877"
          
          },
          notes: {
              address: "work address"
          },
          theme: {
              color: "#3399cc",
          },
      }
      const rzp1 = new RazorPay(options);
      rzp1.open();
      
  }, [RazorPay])

  let a = itemdetails.map((details) => {
    return details.price;
  });

  console.log(a);
  useEffect(() => {
    const totalPrice = itemdetails.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(totalPrice);

    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  },[itemdetails]);

  return (
    <>
      <div className="Model-Wrapper"></div>
      <div className="Model-cointainer">
        <AiOutlineCloseCircle
          style={{ height: "50px", width: "50px", float: "right" }}
          onClick={closeModel}
        ></AiOutlineCloseCircle>
        <div style={{ padding: "30px" }}>
          {itemdetails.map((item) => {
            return (
              <div>
                <div className="container1">
                  <div className="row">
                    <div className="col-sm">
                      <h3>{item.RecipeTitel}</h3>
                    </div>
                    <div className="col-sm" style={{width:"200px"}} >--------</div>
                    <div className="col-sm">
                      <h4 style={{ color: "red" }}>{item.price}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <hr></hr>
          <div className="container1">
            <div className="row">
              <div className="col-sm">
                <h2>Total:</h2>
              </div>
              <div className="col-sm" style={{width:"200px"}} >--------</div>
              <div className="col-sm">
                <h4 style={{ color: "red" }}>{TotalPrice}</h4>
              </div>
            </div>
          </div>
        </div>
        <button  className="Paybtn" onClick={()=>{razorPayDisplay(TotalPrice)}}> Proceed To Pay</button>
      </div>
    </>
  );
}

export default Modal;
