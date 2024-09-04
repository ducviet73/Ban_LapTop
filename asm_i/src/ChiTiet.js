import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
import { themSP } from "./cartSlice";
import { useDispatch } from "react-redux";

function ChiTiet() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [sp, ganSP] = useState([]);
    const [splq, ganSPLQ] = useState([]);

    useEffect(() => {
        let url = `http://localhost:3000/sp/${id}`;
        fetch(url).then(res => res.json()).then(data => ganSP(data));
        
        let urlLQ = `http://localhost:3000/splienquan/${id}`;
        fetch(urlLQ).then(res => res.json()).then(data => ganSPLQ(data));
    }, [id]);
    
    return (
        <div id='chitiet'>        
            <div id="row1">
                <div id="trai"> <img src={sp['hinh']} alt={sp['ten_sp']} /> </div>
                <div id="phai"> 
                    <h1 className="h3"> {sp['ten_sp']} </h1>
                    <p><span>Giá gốc</span>: {Number(sp['gia']).toLocaleString("vi")} VNĐ</p>
                    <p><span>Giá KM</span>: {Number(sp['gia_km']).toLocaleString("vi")} VNĐ</p>
                    <p><span>Ngày</span>: {new Date(sp['ngay']).toLocaleString("vi-VN")}</p>
                    <button onClick={() => dispatch(themSP(sp))}>Thêm vào giỏ</button>
                </div>
            </div>
            <div id="row2">
                <h3>Sản Phẩm Liên Quan</h3>
                <div className="splienquan">
                    {splq.map(sp => (
                        <div key={sp.id} className="sp-item">
                            <img src={sp.hinh} alt={sp.ten_sp} />
                            <h4>{sp.ten_sp}</h4>
                            <p>Giá: {Number(sp.gia).toLocaleString("vi")} VNĐ</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChiTiet;
