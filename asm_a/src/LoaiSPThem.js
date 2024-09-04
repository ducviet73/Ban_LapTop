import React from 'react';
import { Link } from "react-router-dom";

function LoaiSPThem() {
  let loaisp = {};
  const submitDuLieu = () => {
    let url = `http://localhost:3000/admin/loaisp`;
    let opt = {
      method: "post",
      body: JSON.stringify(loaisp),
      headers: { 'Content-Type': 'application/json' }
    };
  
    fetch(url, opt)
      .then(res => res.json())
      .then(data => {
        console.log('Đã thêm', data);
        alert('Đã thêm thành công loai sản phẩm');
      })
  };
  
  return (
    <section class="content">

    <form id="frmaddsp">
      <h2>Thêm sản phẩm</h2>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="ten_loai">Tên Loại</label>
          <input onChange={ e => loaisp.ten_loai= e.target.value} type="text" id="tenSp" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="thu_tu">Thứ tự</label>
          <input onChange={ e => loaisp.thu_tu= e.target.value} type="number" id="gia" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="an_hien">Ẩn / Hiện</label><br />
          <input 
            type="radio" 
            id="hien" 
            name="an_hien" 
            value="1" 
            onChange={e => loaisp.an_hien = e.target.value} 
          />
          <label htmlFor="hien">Hiện</label><br />
          
          <input 
            type="radio" 
            id="an" 
            name="an_hien" 
            value="0" 
            onChange={e => loaisp.an_hien = e.target.value} 
          />
          <label htmlFor="an">Ẩn</label>
        </div>
      </div>
      
      <div className="mb-3">
      <button className="btn btn-warning" type="button" onClick={ () => submitDuLieu()} > Thêm loại sản phẩm</button> &nbsp;
      <Link to="/admin/loaisp" className="btn btn-info">Danh sách</Link>
      </div>
    </form>
    </section>
  );
}

export default LoaiSPThem;
