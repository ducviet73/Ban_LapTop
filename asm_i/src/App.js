import React from 'react';
import logo from './logo.svg';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Home'; // Ensure the correct import
import Menu from './Menu'; // Ensure the correct import
import SanPhamXemNhieu from './SanPhamXemNhieu';
import SPTrongLoai from './SPTrongLoai';
import GioiThieu from './GioiThieu';
import ChiTiet from './ChiTiet';
import TimKiem from './TimKiem';
import NotFound from './NotFound.JS';
import ShowCart from './ShowCart';
import ThanhToan from './ThanhToan';
var sotin =10;
function App() {
  return (
    <BrowserRouter >
        <div className="container">
			
      <header >
      <nav>
	  <main className='d-flex'>
      <article2 className='col-md-5'></article2>
	  <aside2 className='col-md-7'> <Menu/>  </aside2>
      </main>

      </nav>
	  </header>

      <main className='d-flex'>
      <article className='col-md-9'>
      <Routes>
      <Route path="/thanhtoan/" element={<ThanhToan/>} />
      <Route path="/" exact element={<Home/>} />
      <Route path="/gioithieu" element={<GioiThieu/>} />
      <Route path="/sp/:id" element={<ChiTiet/>} />
      <Route path="/loai/:id_loai" element={<SPTrongLoai/>} />
      <Route path="/timkiem/" element={<TimKiem/>} />
      <Route path="/showcart/" element={<ShowCart/>} />
      <Route element={<NotFound/>}/>
      </Routes>
        </article>       
      <aside className='col-md-3'> <SanPhamXemNhieu sotin={sotin}/>  </aside>
      </main>
      <footer id="footer">
			<div class="section">
				<div class="container">
					<div class="row">
						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Về Chúng Tôi</h3>
								<p>Việc chăm sóc khách hàng là rất quan trọng và khách hàng sẽ được theo dõi nhưng nó sẽ diễn ra cùng lúc sẽ giúp thu hút hơn</p>
								<ul class="footer-links">
									<li><a href="#"><i class="fa fa-map-marker"></i>	Quận 12 , TP.Hồ Chí Minh</a></li>
									<li><a href="#"><i class="fa fa-phone"></i>+84 987657688</a></li>
									<li><a href="#"><i class="fa fa-envelope-o"></i>ducviettk099@email.com</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Danh mục</h3>
								<ul class="footer-links">
									<li><a href="#">Hot nhất</a></li>
									<li><a href="#">Nike</a></li>
									<li><a href="#">Adidas</a></li>
									<li><a href="#">Sneaker</a></li>
								</ul>
							</div>
						</div>


						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">Thông tin</h3>
								<ul class="footer-links">
									<li><a href="#">Về chúng tôi</a></li>
									<li><a href="#">Liên hệ chúng tôi</a></li>
									<li><a href="#">Chính sách bảo mật</a></li>
									<li><a href="#">Đơn đặt hàng và trả lại</a></li>
									<li><a href="#">Điều khoản và điều kiện</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">
									Dịch vụ</h3>
								<ul class="footer-links">
									<li><a href="#">
										Tài khoản của tôi</a></li>
									<li><a href="#">
										Xem giỏ hàng</a></li>
									<li><a href="#">Danh sách yêu thích</a></li>
									<li><a href="#">Theo dõi đơn hàng của tôi</a></li>
									<li><a href="#">Giúp</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			
		</footer>
    </div>

    </BrowserRouter>
  );
}

export default App;
