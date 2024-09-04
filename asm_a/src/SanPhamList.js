import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function SanPhamList() {
  const [listSP, setListSP] = useState([]);
  const navigate = useNavigate();
  const xoaSP = (id) => {
    if (window.confirm('Bạn thật sự muốn xóa sản phẩm này ') === false) return false;
    fetch(`http://localhost:3000/admin/sp/${id}`, { method: "delete" })
      .then(res => res.json())
      .then(data => navigate(0));    
    };
  useEffect(() => {
    fetch("http://localhost:3000/admin/sp")
      .then(res => res.json())
      .then(data => setListSP(data))
      .catch(err => console.error('Lỗi khi lấy danh sách sản phẩm:', err));
  }, []);

  return (
    <section class="content">

    <div id="adminspList">
    <div class="left">
                  <h1>Danh sách sản phẩm</h1>
              </div>
              <a href="#" class="download-btn" type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                  <i class="fas fa-cloud-download-alt"></i>
                  <span class="text"><Link to="/admin/spthem">Thêm sản phẩm</Link></span>
              </a>
      <h5 className='sp' key={0}>
        <b>Tên</b> <b>Ảnh</b> <b>Ngày</b> <b>Giá</b> <b></b>
      </h5>
      {listSP.map((sp) => (
        <div className='sp' key={sp.id_sp}>
          <span>{sp.ten_sp}</span> 
          <span><img src={sp.hinh} alt=""></img></span> 
          <span>{new Date(sp.ngay).toLocaleDateString('vi')}</span> 
          <span>{sp.gia.toLocaleString('vi')} VNĐ</span>
          <span>
          <a href="#/" className='btn btn-danger' onClick={()=>xoaSP(sp.id)} >Xóa</a>
            <Link to={`/admin/spsua/${sp.id}`} className='btn btn-primary'>Sửa</Link> 
          </span>
        </div>
      ))}
    </div>
    </section>
  );
}

export default SanPhamList;
