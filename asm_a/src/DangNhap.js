import React from "react"; 
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import { useNavigate } from "react-router-dom";

function DangNhap() {
    let emailRef =    React.createRef();
    let passwordRef =     React.createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitDuLieu = () => { 
    if (emailRef.current.value === "" || passwordRef.current.value === "") 
        { alert("Vui lòng nhập đầy đủ thông tin "); return;
    }
    let url = "http://localhost:3000/login";
    let tt = {email:emailRef.current.value, password:passwordRef.current.value }
    var opt = {
    method: "post",
    body: JSON.stringify(tt),
    headers: {'Content-Type': 'application/json'} }
    fetch(url, opt)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Đăng nhập thất bại");
      }
    })
    .then((data) => {
      console.log(data);
      dispatch(dalogin(data));
      navigate("/trangchu");
    })
    .catch((error) => {
      alert(error.message);
    });
    }
    return (
      <section class="contenta">

    <form id="frmlogin" className="col-7 m-auto border border-primary"> <h2 className="bg-info h5 p-2">Thành viên đăng nhập</h2>
    <div className="m-3">
    Tên đăng nhập<input className="form-control" type="text" ref={emailRef} /> </div>
    <div className="m-3">
    Mật khẩu <input className="form-control" type="password" ref={passwordRef} /> </div>
    <div className="m-3">
    <button type="button" onClick={()=>submitDuLieu()} className="btn btn-info" >
        Đăng nhập
    </button> 
    </div>
     </form>
     </section>
    )};

export default DangNhap;