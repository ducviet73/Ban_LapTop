import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from 'react';
function LoaiSPSua() {
  let {id} = useParams();
  const [loaisp, ganLoaisp] = useState();
  useEffect ( () => {
    let opt = {
      method: "get",
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`http://localhost:3000/admin/loaisp/${id}` , opt)
    .then (res => res.json())
    .then (data => {
        ganLoaisp(data)
    })
  } , [id])
  const submitDuLieu = () => {
    let url = `http://localhost:3000/admin/loaisp/${id}`;
    let opt = {
      method: "put",
      body: JSON.stringify(loaisp),
      headers: { 'Content-Type': 'application/json' }
    };
  
    fetch(url, opt)
      .then(res => res.json())
      .then(data => {
        console.log('Đã thêm', data);
        alert('Đã sửa thành công loai sản phẩm');
      })
  };
  
  return (
    
<form id="frmaddsp">
      <h2>Sửa sản phẩm</h2>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="ten_loai">Tên Loại</label>
          <input defaultValue={loaisp?.ten_loai} onChange={ e => loaisp.ten_loai= e.target.value} type="text" id="tenSp" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="thu_tu">Thứ tự</label>
          <input  defaultValue={loaisp?.thu_tu} onChange={ e => loaisp.thu_tu= e.target.value} type="number" id="gia" className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="an_hien">Ẩn / Hiện</label><br />
          <label htmlFor="hien">Hiện</label>;

          <input 
            type="radio" 
            id="hien" 
            name="an_hien" 
            value="1" 
            checked="1"
            onChange={e => loaisp.an_hien = e.target.value} 
          />
          <label htmlFor="an">Ẩn</label>
          <input 
            type="radio" 
            id="an" 
            name="an_hien" 
            value="0" 
            onChange={e => loaisp.an_hien = e.target.value} 
          />
        </div>
      </div>
      
      <div className="mb-3">
      <button className="btn btn-warning" type="button" onClick={ () => submitDuLieu()} > Sửa loại sản phẩm</button> &nbsp;
      <Link to="/admin/loaisp" className="btn btn-info">Danh sách</Link>
      </div>
    </form>  );
}

export default LoaiSPSua;
