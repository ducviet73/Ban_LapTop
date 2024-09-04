import React from 'react';
import { Link } from "react-router-dom";

function SanPhamThem() {
  let sp = {};
  const submitDuLieu = () => {
    let url = `http://localhost:3000/admin/sp`;
    let opt = {
      method: "post",
      body: JSON.stringify(sp),
      headers: { 'Content-Type': 'application/json' }
    };
  
    fetch(url, opt)
      .then(res => res.json())
      .then(data => {
        console.log('Đã thêm', data);
        alert('Đã thêm thành công sản phẩm');
      })
  };
  
  return (
    <section class="content">

    <form id="frmaddsp">
      <h2>Thêm sản phẩm</h2>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="tenSp">Tên SP</label>
          <input onChange={ e => sp.ten_sp= e.target.value} type="text" id="tenSp" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="gia">Giá</label>
          <input onChange={ e => sp.gia= e.target.value} type="number" id="gia" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="giaKm">Giá KM</label>
          <input onChange={ e => sp.gia_km= e.target.value} type="number" id="giaKm" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="hinh">Hình</label>
          <input onChange={ e => sp.hinh= e.target.value} type="text" id="hinh" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="ngay">Ngày</label>
          <input onChange={ e => sp.ngay= e.target.value} type="date" id="ngay" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="luotXem">Lượt xem</label>
          <input onChange={ e => sp.luot_xem= e.target.value} type="number" id="luotXem" className="form-control" />
        </div>
      </div>
      <div className="mb-3">
      <button className="btn btn-warning" type="button" onClick={ () => submitDuLieu()} > Thêm sản phẩm</button> &nbsp;
      <Link to="/admin/sp" className="btn btn-info">Danh sách</Link>
      </div>
    </form>
    </section>
  );
}

export default SanPhamThem;
