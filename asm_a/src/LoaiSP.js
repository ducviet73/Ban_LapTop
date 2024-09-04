import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoaiSP() {
  const [listLoai, setListLoai] = useState([]);
  const navigate = useNavigate();

  const xoaLoaiSP = (id) => {
    if (window.confirm('Bạn thật sự muốn xóa loại sản phẩm này?') === false) return;
    fetch(`http://localhost:3000/admin/loaisp/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }
        return res.json();
      })
      .then(() => navigate(0))    
      .catch(err => console.error('Lỗi khi xóa loại sản phẩm:', err));
  };

  useEffect(() => {
    fetch("http://localhost:3000/admin/loaisp")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }
        return res.json();
      })
      .then(data => setListLoai(data))
      .catch(err => console.error('Lỗi khi lấy loại sản phẩm:', err));
  }, []);

  return (
    <section class="content">
    <div id="adminspList">
    <h1>Danh sách loại sản phẩm</h1>
              <a href="#" class="download-btn" type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                  <i class="fas fa-cloud-download-alt"></i>
                  <span class="text"><Link to="/admin/loaispthem">Thêm loại</Link></span>
              </a>

      <h5 className='sp'>
        <b>Tên Loại</b> <b>Thứ Tự</b> <b>Ẩn / Hiện</b> <b></b>
      </h5>
      {listLoai.map((loaisp) => (
        <div className='sp' key={loaisp.id_loaisp}>
          <span>{loaisp.ten_loai}</span> 
          <span>{loaisp.thu_tu}</span>
          <span>{loaisp.an_hien === 1 ? "Hiện" : "Ẩn"}</span> 
          <span>
            <button className='btn btn-danger' onClick={() => xoaLoaiSP(loaisp.id)}>Xóa</button>
            <Link to={`/admin/loaispsua/${loaisp.id}`} className='btn btn-primary'>Sửa</Link>
          </span>
        </div>
      ))}
    </div>
    </section >

  );
}

export default LoaiSP;
