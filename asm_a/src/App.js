import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from './Menu';
import Admin from './Admin';
import SanPhamList from './SanPhamList';
import NotFound from './NotFound';
import SanPhamThem from './SanPhamThem';
import SanPhamSua from './SanPhamSua';
import DangNhap from './DangNhap';
import { useSelector } from 'react-redux';
import Download from './DownLoad';
import ProtectedRoute from './ProtectedRoute';
import LoaiSP from './LoaiSP';
import LoaiSPThem from './LoaiSPThem';
import LoaiSPSua from './LoaiSPSua';
import TrangChu from './TrangChu';
import DangKy from './DangKy';
function App() {
  const users = useSelector(state => state.auth.user);
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  return (
    <BrowserRouter basename="/">
      <div className="container">
      <header>
          <div id="userInfo">
          {users === null || users === undefined ? "Chào quý khách" : "Chào " + users.name}
          </div>
        </header>
        <nav><Menu /></nav>
        <main>
          <Routes>
          <Route element={<ProtectedRoute/>}>  
              <Route path="/" element={<Admin />} />
              <Route path="/trangchu" element={<TrangChu />} />
              <Route path="/admin/sp" element={<SanPhamList />} />
              <Route path="/admin/spthem" element={<SanPhamThem />} />
              <Route path="/admin/spsua/:id" element={<SanPhamSua />} />
              <Route path="/admin/loaisp" element={<LoaiSP />} />
              <Route path="/admin/loaispthem" element={<LoaiSPThem />} />
              <Route path="/admin/loaispsua/:id" element={<LoaiSPSua />} />
            </Route>
              <Route path="/dangnhap" element={<DangNhap />} />
              <Route path="/dangky" element={<DangKy />} />
              <Route path="/download" element={daDangNhap===true? <Download/>:<Navigate to="/dangnhap"/> } />
              <Route path="*" element={<NotFound />} />


          </Routes>
          
        </main>
        <footer><p></p></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
