import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";

function SPTrongLoai() {
  let { id_loai } = useParams();
  const [list_sp, setListSP] = useState([]);
  const [loai, setLoai] = useState("");

  useEffect(() => {
    // Fetch products in the specified category
    fetch(`http://localhost:3000/sptrongloai/${id_loai}`)
      .then(res => res.json())
      .then(data => setListSP(data))
      .catch(error => console.error("Error fetching products:", error));

    // Fetch category information
    fetch(`http://localhost:3000/loai/${id_loai}`)
      .then(res => res.json())
      .then(data => setLoai(data))
      .catch(error => console.error("Error fetching category:", error));
  }, [id_loai]);

  return (
    <div id="listsp">
      <h1>Các sản phẩm {loai.ten_loai}</h1>
      <PhanTrang listSP={list_sp} pageSize={6} />
    </div>
  );
}

function PhanTrang({ listSP, pageSize }) {
  const [fromIndex, setFromIndex] = useState(0);
  const toIndex = fromIndex + pageSize;
  const spTrong1Trang = listSP.slice(fromIndex, toIndex);
  const tongSoTrang = Math.ceil(listSP.length / pageSize);

  const chuyenTrang = (event) => {
    const newIndex = event.selected * pageSize;
    setFromIndex(newIndex);
  };

  return (
    <div>
      <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
      <ReactPaginate
        nextLabel=">"
        previousLabel="<"
        pageCount={tongSoTrang}
        pageRangeDisplayed={5}
        onPageChange={chuyenTrang}
        className="thanhphantrang"
      />
    </div>
  );
}

function HienSPTrongMotTrang({ spTrongTrang }) {
  const dispatch = useDispatch();

  return (
    <div id="data">
      {spTrongTrang.map((sp, index) => (
        <div className="sp" key={index}>
          <h4><Link to={`/sp/${sp.id}`}>{sp.ten_sp}</Link></h4>
          <img src={sp.hinh} alt={sp.ten_sp} />
          <button><a href="#" onClick={() => dispatch(themSP(sp))}>Thêm vào giỏ</a></button>
        </div>
      ))}
    </div>
  );
}

export default SPTrongLoai;
