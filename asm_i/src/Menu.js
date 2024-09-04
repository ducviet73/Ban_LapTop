import React from "react";
import { listloai } from "./data";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
      <ul className="menu" >
        <li><Link to="/">Trang chủ</Link></li>
        <li>
          <a href="#">Sản phẩm</a>
          <ul>
            {listloai.map((loai, i) => (
              <li key={i}><Link to={"/loai/"+ loai.id_loai}>{loai.ten_loai}</Link></li>
            ))}
          </ul>
        </li>
        <li><Link to="/gioithieu/">Giới Thiệu</Link></li>
        <li><Link to="/timkiem/">Tìm Kiếm</Link></li>
        <li><Link to="/showcart/">Giỏ hàng</Link></li>
      </ul>
    );
  }
}

export default Menu;
