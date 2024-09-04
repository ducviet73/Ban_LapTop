import React, { useState } from 'react';
import { listsp } from "./data";
import { Link } from "react-router-dom";

function SanPhamXemNhieu(props) {
    const [sotin, setSotin] = useState(props.sotin);
    const thayDoiSoTin = (soTinMoi) => {
        setSotin(soTinMoi);
    };
    let jsxcode = (
        <div id="spxn">
            {listsp.slice(0, sotin).map((sp, i) =>
                <div className="sp" key={i}>
                    <Link to={"/sp/" + sp.id_sp}>{sp['ten_sp']}</Link>
                </div>
            )}
        </div>
    );

    return (
        <div className='a'>
            {jsxcode}
            <button onClick={() => thayDoiSoTin(sotin + 1)}>Xem thêm</button>
            <button onClick={() => thayDoiSoTin(sotin - 1)}>Xem ít hơn</button>
        </div>
    );
}

export default SanPhamXemNhieu;
