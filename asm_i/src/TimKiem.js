import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";

const TimKiem = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSearch = async () => {
        if (!keyword.trim()) {
            setError('Vui lòng nhập từ khóa tìm kiếm');
            return;
        }
        setError('');
        try {
            const response = await fetch(`http://localhost:3000/timkiem?q=${encodeURIComponent(keyword)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data);
            } else {
                setError('Lỗi khi tìm kiếm sản phẩm');
            }
        } catch (err) {
            setError('Có lỗi xảy ra trong quá trình kết nối');
        }
    };

    return (
        <div className="timkiem">
            <h2>Tìm kiếm sản phẩm</h2>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Nhập tên sản phẩm..."
            />
            <button onClick={handleSearch}>Tìm kiếm</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {results.length > 0 && (
                <div className="home">
                    {results.map((product) => (
                        <div key={product.id} className="sp">
                            <img src={product.hinh} alt={product.ten_sp} />
                            <h4>
                                <Link to={`/sp/${product.id}`}>
                                    {product.ten_sp}
                                </Link>
                            </h4>
                            <p>{Number(product.gia).toLocaleString("vi")} VNĐ</p>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimKiem;
