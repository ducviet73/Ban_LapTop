import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { xoaSP, suaSL, xoaGH } from "./cartSlice"; // Import the new action xoaGH
import { Link } from "react-router-dom";

function ShowCart(props) {
  const cart = useSelector((state) => state.cart.listSP);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, newValue) => {
    dispatch(suaSL([id, newValue]));
  };

  const handleDeleteItem = (id) => {
    dispatch(xoaSP(id));
  };

  const handleClearCart = () => {
    dispatch(xoaGH());
  };

  return (
    <div id="giohang">
  <h2>Giỏ hàng của bạn</h2>
  <table>
    <thead>
      <tr>
        <th>Tên sản phẩm</th>
        <th>Số lượng</th>
        <th>Giá sản phẩm</th>
        <th>Tổng</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {cart.map((sp, index) => (
        
        <tr key={index}>
          <td>{sp.ten_sp}</td>
          <td>
            <input
              type="number"
              defaultValue={sp.so_luong}
              onChange={(e) => handleQuantityChange(sp.id, e.target.value)}
            />
          </td>
          <td>{Number(sp.gia * sp.so_luong).toLocaleString("vi")} VNĐ</td>
          <td>
            <button ><a href="#" onClick={() => handleDeleteItem(sp.id)}>
              Xóa
            </a></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
 
  <div>
    <button onClick={handleClearCart}>Xóa toàn bộ giỏ hàng</button>
    <button>
      <Link to="/thanhtoan">Thanh toán</Link>
    </button>
  </div>
</div>
  );
}

export default ShowCart;
