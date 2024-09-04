import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { thoat } from "./authSlice";

function Menu() {
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.user);


  return (
    
    <section class="sidebar">
                <div id="userInfo">
          {users === null || users === undefined ? "Chào quý khách" : "Chào " + users.name}
          </div>
    <a href="#" class="logo">
      <i class="fab fa-slack"></i>
      <span class="text">XShop</span>
    </a>

    <ul class="side-menu top">
      <li >
        <a href="index.html" class="nav-link">
          <i class="fas fa-border-all"></i>
          <Link className="dropdown-item" to="/trangchu">Trang chủ</Link>
        </a>
      </li>
      <li >
        <a href="Products.html" class="nav-link">
          <i class="fas fa-shopping-cart"></i>
          <Link className="dropdown-item" to="/admin/loaisp">Danh sách loại</Link>
          </a>
      </li>
      <li>
        <a href="categories.html" class="nav-link">
          <i class="fas fa-chart-simple"></i>
          <Link className="dropdown-item" to="/admin/sp">Danh sách sản phẩm</Link>
          </a>
      </li>
      <li>
        <a href="#" class="nav-link">
          <i class="fas fa-message"></i>
          <span class="text">Quản lý đơn hàng</span>
          {/* <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Xem đơn hàng mới</a></li>
                <li><a className="dropdown-item" href="#">Danh sách đơn hàng</a></li>
              </ul> */}
        </a>
      </li>
      {!daDangNhap ? (
    <>
    <li className="nav-item">
      <Link className="nav-link" to="/dangnhap">Đăng nhập</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/dangky">Đăng ký</Link>
    </li>
      </>
    ) : (
      <li className="nav-item">
        <a className="nav-link" href="#/" onClick={() => dispatch(thoat())}>Thoát</a>
      </li>
    )}

            </ul>
      
  </section>
    

  );
}

export default Menu;
