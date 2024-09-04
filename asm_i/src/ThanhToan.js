import React from "react";
import { useSelector } from "react-redux";
import { xoaSP } from "./cartSlice";
import { useDispatch } from "react-redux";

function ThanhToan() {
  const dispatch = useDispatch();
  let htRef = React.createRef();
  let emRef = React.createRef();
  let phoneRef = React.createRef(); // Ref for phone number
  let addressRef = React.createRef(); // Ref for address

  const cart = useSelector((state) => state.cart.listSP);

  const submitDuLieu = () => {
    let ht = htRef.current.value;
    let em = emRef.current.value;
    let phone = phoneRef.current.value; // Get phone number value
    let address = addressRef.current.value; // Get address value

    if (ht === "" || em === "" || phone === "" || address === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }

    let url = "http://localhost:3000/luudonhang";
    let tt = { ho_ten: ht, email: em, phone: phone, dia_chi: address };
    var opt = {
      method: "post",
      body: JSON.stringify(tt),
      headers: { "Content-Type": "application/json" },
    };

    fetch(url, opt)
      .then((res) => res.json())
      .then((data) => {
        if (data.id_dh < 0) {
          console.log("Lỗi lưu đơn hàng", data);
          alert("Đã xảy ra lỗi khi lưu đơn hàng");
        } else {
          let id_dh = data.id_dh;
          // alert(`Đã lưu đơn hàng với ID: ${id_dh}`);
          alert(`Lưu đơn hàng thành công`);
          luuchitietdonhang(id_dh, cart);
        }
      });
  };

  const luuchitietdonhang = (id_dh, cart) => {
    let url = "http://localhost:3000/luugiohang";
    cart.forEach((sp) => {
      let t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong };
      let opt = {
        method: "post",
        body: JSON.stringify(t),
        headers: { "Content-Type": "application/json" },
      };
      fetch(url, opt)
        .then((res) => res.json())
        .then((data) => luuxongsp(data))
        .catch((err) => console.log("Lỗi lưu sản phẩm:", err));
    });
  };

  const luuxongsp = (data) => {
    console.log(data);
    dispatch(xoaSP(data.id_sp));
  };

  return (
    <form id="frmthanhtoan">
      <h2>Thanh toán đơn hàng</h2>
      <div>
        <label>Họ tên</label>
        <input ref={htRef} type="text" />
      </div>
      <div>
        <label>Email</label>
        <input ref={emRef} type="email" />
      </div>
      <div>
        <label>Số điện thoại</label>
        <input ref={phoneRef} type="tel" />
        </div>
      <div>
        <label>Địa chỉ</label>
        <input ref={addressRef} type="text" />
      </div>
      <div>
        <button onClick={() => submitDuLieu()} type="button">
          Lưu đơn hàng
        </button>
      </div>
    </form>
  );
}

export default ThanhToan;
