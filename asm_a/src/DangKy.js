import React from "react";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice"; // Giả sử sau khi đăng ký sẽ tự động đăng nhập
import { useNavigate } from "react-router-dom";

function DangKy() {
  let nameRef = React.createRef();
  let emailRef = React.createRef();
  let passwordRef = React.createRef();
  let dienThoaiRef = React.createRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitDuLieu = () => {
    // Kiểm tra các trường nhập liệu
    if (
      nameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      dienThoaiRef.current.value === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // URL của API endpoint để đăng ký
    let url = "http://localhost:3000/register";
    let tt = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      dien_thoai: dienThoaiRef.current.value,
    };

    var opt = {
      method: "post",
      body: JSON.stringify(tt),
      headers: { "Content-Type": "application/json" },
    };

    // Gửi yêu cầu đăng ký tới máy chủ
    fetch(url, opt)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Đăng ký thất bại");
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(dalogin(data)); // Giả sử sau khi đăng ký thành công, tự động đăng nhập
        navigate("/"); // Chuyển hướng về trang chủ hoặc trang phù hợp sau khi đăng ký thành công
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className="contenta">
            <form id="frmregister" className="form-container">
        <h2 className="form-header">Đăng ký thành viên</h2>
        <div className="input-group">
          Họ tên
          <input className="input-field" type="text" ref={nameRef} />
        </div>
        <div className="input-group">
          Email
          <input className="input-field" type="text" ref={emailRef} />
        </div>
        <div className="input-group">
          Mật khẩu
          <input className="input-field" type="password" ref={passwordRef} />
        </div>
        <div className="input-group">
          Điện thoại
          <input className="input-field" type="text" ref={dienThoaiRef} />
        </div>
        <div className="input-group">
          <button
            type="button"
            onClick={() => submitDuLieu()}
            className="submit-button"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </section>
  );
}

export default DangKy;
