const mysql = require('mysql');
const exp = require("express");
const app = exp();
var cors = require('cors');
const fs = require("fs");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
app.use( [ cors() , exp.json() ] );
const db = mysql.createConnection({
   host:'localhost', user:'root', password:'', port:3306, database:'laptop_react'
}); 
db.connect( err => { if (err) throw err; console.log('Da ket noi database') });

// nơi định nghĩa các đường route

app.listen(3000, () => console.log(`Ung dung dang chay voi port 3000`) );

// SẢN PHẨM 
app.get('/spmoi/:sosp?', function(req, res) {
    let sosp = parseInt(req.params.sosp || 6);
    if (sosp <= 1) sosp = 6;
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
               FROM san_pham WHERE an_hien = 1 ORDER BY ngay DESC LIMIT 0, ?`;
    db.query(sql, sosp, (err, data) => {
        if (err) {
            res.json({"thongbao": "Lỗi lấy list sp", "error": err});
        } else {
            res.json(data);
        }
    });
});
app.get('/spxn/:sosp?', function(req, res) {
    let sosp = parseInt(req.params.sosp || 6);
    if (sosp <= 1) sosp = 6;
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
               FROM san_pham WHERE an_hien = 1 ORDER BY luot_xem DESC LIMIT 0, ?`;
    db.query(sql, sosp, (err, data) => {
        if (err) {
            res.json({"thongbao": "Lỗi lấy list sp", "error": err});
        } else {
            res.json(data);
        }
    });
});


app.get('/sp/:id', function(req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({"thong bao": "Không biết sản phẩm", "id": id});
        return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
               FROM san_pham WHERE id = ?`;
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({"thongbao": "Lỗi lấy 1 sp", "error": err});
        } else {
            res.json(data[0]);
        }
    });
});


app.get('/sptrongloai/:id_loai', function(req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({"thong bao": "Không biết loại", "id_loai": id_loai});
        return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay
               FROM san_pham WHERE id_loai = ? AND an_hien = 1 ORDER BY id DESC`;
    db.query(sql, id_loai, (err, data) => {
        if (err) {
            res.json({"thongbao": "Lỗi lấy sp trong loại", "error": err});
        } else {
            res.json(data);
        }
    });
});

// LẤY SẢN PHẨM LIÊN QUAN
app.get('/splienquan/:id', function(req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({"thongbao": "Không biết sản phẩm", "id": id});
        return;
    }
    // Lấy id_loai của sản phẩm hiện tại
    let sql = `SELECT id_loai FROM san_pham WHERE id = ?`;
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({"thongbao": "Lỗi lấy loại sản phẩm", "error": err});
        } else {
            let id_loai = data[0].id_loai;
            let sql_lq = `SELECT id, ten_sp, gia, gia_km, hinh, ngay 
                          FROM san_pham WHERE id_loai = ? AND id != ? AND an_hien = 1 ORDER BY ngay DESC LIMIT 0, 4`;
            db.query(sql_lq, [id_loai, id], (err, data_lq) => {
                if (err) {
                    res.json({"thongbao": "Lỗi lấy sản phẩm liên quan", "error": err});
                } else {
                    res.json(data_lq);
                }
            });
        }
    });
});



app.get('/loai/:id_loai', function(req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({"thong bao": "Không biết loại", "id_loai": id_loai});
        return;
    }
    let sql = `SELECT id, ten_loai FROM loai WHERE id = ?`;
    db.query(sql, id_loai, (err, data) => {
        if (err) {
            res.json({"thongbao": "Lỗi lấy loại", "error": err});
        } else {
            res.json(data[0]);
        }
    });
});

// LƯU ĐƠN HÀNG
app.post('/luudonhang/', function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO don_hang SET ?`;
    
    db.query(sql, data, function(err, result) {
        if (err) {
            console.error('Error saving order:', err);
            res.status(500).json({"id_dh": -1, "thongbao": "Lỗi lưu đơn hàng", "error": err});
        } else {
            let id_dh = result.insertId;
            res.json({"id_dh": id_dh, "thongbao": "Đã lưu đơn hàng"});
        }
    });
});

// LƯU GIỎ HÀNG
app.post('/luugiohang/', function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO don_hang_chi_tiet SET ?`;

    db.query(sql, data, function(err, result) {
        if (err) {
            console.error('Error saving cart item:', err);
            res.status(500).json({"thongbao": "Lỗi lưu sản phẩm", "error": err});
        } else {
            res.json({"thongbao": "Đã lưu sản phẩm vào db", "id_sp": data.id_sp});
        }
    });
});

// TÌM KIẾM SẢN PHẨM
app.get('/timkiem', function(req, res) {
    let keyword = req.query.q;
    if (!keyword) {
        res.json({"thongbao": "Vui lòng nhập từ khóa tìm kiếm"});
        return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay
               FROM san_pham WHERE an_hien = 1 AND ten_sp LIKE ? ORDER BY ngay DESC`;
    db.query(sql, [`%${keyword}%`], (err, data) => {
        if (err) {
            res.json({"thongbao": "Lỗi tìm kiếm sản phẩm", "error": err});
        } else {
            res.json(data);
        }
    });
});


// ADMIN SẢN PHẨM
app.get('/admin/sp', function (req, res) {
    let sql = `SELECT id, ten_sp, gia, hinh, ngay, luot_xem 
        FROM san_pham ORDER BY ngay desc ` ;
    db.query(sql, (err, data) => {
        if (err) res.json({"thongbao":"Lỗi lấy list sp", err }) 
        else res.json(data);
    });
    
});

app.get('/admin/sp/:id', function (req, res) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
    res.json({"thong bao":"Không biết sản phẩm", "id": id}); return;
    }
    let sql = 'SELECT * FROM san_pham WHERE id = ?'
    db.query(sql, id, (err, data) => {
        if (err) res.json({"thongbao":"Lỗi lấy 1 sp", err })
        else res.json(data[0]);
    });
});

app.post('/admin/sp', function(req, res) {
    let data = req.body;
    let sql = 'INSERT INTO san_pham SET ?'; 
    db.query(sql, data, (err, data) => {
    if (err) res.json({"thongbao":"Lỗi chèn 1 sp", err });
    else res.json({"thongbao":"Đã chèn 1 sp", "id": data.insertId });
    });
});

app.put('/admin/sp/:id', function(req, res) {
    let data = req.body;
    let id= req.params.id;
    let sql = 'UPDATE san_pham SET? WHERE id = ?';
    db.query(sql, [data, id], (err, d) => {
        if (err) res.json({"thongbao":"Lỗi cập nhật sp", err }); 
        else res.json({"thongbao":"Đã cập nhật sp" });
    });
});

app.delete('/admin/sp/:id', function(req, res) {
    let id= req.params.id;
    let sql = 'DELETE FROM san_pham WHERE id = ?';
    db.query(sql, id, (err, d) => {
        if (err) res.json({"thongbao":"Lỗi khi xóa sp", err }); 
        else res.json({"thongbao":"Đã xóa sp" });
    });
});

// ADMIN HIỂN THỊ USER
app.get('/admin/users', (req, res) => {
    const sql = ` SELECT id, name, email, dien_thoai FROM users `;
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ thongbao: 'Lỗi lấy user', error: err });
      }
      res.json(data);
    });
  });
// ĐĂNG KÝ 
app.post('/register', async (req, res) => {
    const { name, email, password, dien_thoai } = req.body;
  
    // Kiểm tra nếu các trường cần thiết không được cung cấp
    if (!name || !email || !password || !dien_thoai) {
      return res.status(400).json({ thongbao: 'Vui lòng điền đầy đủ thông tin' });
    }
  
    try {
  
      // Tạo người dùng mới
      const sql = `INSERT INTO users (name, email, password, dien_thoai) VALUES (?, ?, ?, ?)`;
      db.query(sql, [name, email, password, dien_thoai], (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          return res.status(500).json({ thongbao: 'Lỗi đăng ký', error: err });
        }
        res.json({ thongbao: 'Đăng ký thành công', id: result.insertId });
      });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ thongbao: 'Lỗi máy chủ', error: err });
    }
  });
// ĐĂNG NHẬP
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Lấy email và mật khẩu từ thân của yêu cầu
    
    try {
      // Kiểm tra thông tin đăng nhập
      const userInfo = await checkUserPass(email, password);
      
      if (userInfo) {
        // Tạo mã thông báo JWT nếu thông tin người dùng hợp lệ
        const jwtBearToken = jwt.sign({}, PRIVATE_KEY, {
          algorithm: 'RS256', // Sử dụng thuật toán RS256 để ký
          expiresIn: 120, // Mã thông báo hết hạn sau 120 giây
          subject: userInfo.id.toString() // Đặt subject là ID của người dùng
        });
        
        // Gửi phản hồi thành công với mã thông báo và thông tin người dùng
        res.status(200).json({ token: jwtBearToken, expiresIn: 120, userInfo });
      } else {
        // Gửi phản hồi thất bại nếu thông tin đăng nhập không hợp lệ
        res.status(481).json({ thongbao: 'Đăng nhập thất bại' });
      }
    } catch (error) {
      // Xử lý lỗi xảy ra trong quá trình đăng nhập
      console.error('Error during login:', error);
      res.status(500).json({ thongbao: 'Có lỗi xảy ra' });
    }
  });
  
// Hàm kiểm tra email và mật khẩu
const checkUserPass = (email, password) => {
return new Promise((resolve, reject) => {
    const query = 'SELECT id, name FROM users WHERE email = ? AND password = ?'; // Truy vấn SQL
    db.query(query, [email, password], (err, results) => {
    if (err) {
        return reject(err); // Nếu có lỗi xảy ra, từ chối với lỗi đó
    }
    if (results.length > 0) {
        resolve(results[0]); // Nếu tìm thấy kết quả, giải quyết với thông tin người dùng
    } else {
        resolve(null); // Nếu không tìm thấy, giải quyết với null
    }
    });
});
};
  
// ADMIN LOẠI SẢN PHẨM
  app.get('/admin/loaisp', function (req, res) {
    let sql = `SELECT id, ten_loai, thu_tu, an_hien FROM loai ORDER BY thu_tu  ` ;
    db.query(sql, (err, data) => {
        if (err) res.json({"thongbao":"Lỗi lấy loai sản phẩm", err }) 
        else res.json(data);
    });
});

app.get('/admin/loaisp/:id', function (req, res) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
    res.json({"thong bao":"Không biết loai sản phẩm", "id": id}); return;
    }
    let sql = 'SELECT * FROM loai WHERE id = ?'
    db.query(sql, id, (err, data) => {
        if (err) res.json({"thongbao":"Lỗi lấy 1 loai sp", err })
        else res.json(data[0]);
    });
});

app.post('/admin/loaisp', function(req, res) {
    let data = req.body;
    let sql = 'INSERT INTO loai SET ?'; 
    db.query(sql, data, (err, data) => {
    if (err) res.json({"thongbao":"Lỗi chèn 1 loai sp", err });
    else res.json({"thongbao":"Đã chèn 1 loai sp", "id": data.insertId });
    });
});

app.put('/admin/loaisp/:id', function(req, res) {
    let data = req.body;
    let id= req.params.id;
    let sql = 'UPDATE loai SET? WHERE id = ?';
    db.query(sql, [data, id], (err, d) => {
        if (err) res.json({"thongbao":"Lỗi cập nhật loai sp", err }); 
        else res.json({"thongbao":"Đã cập nhật loai sp" });
    });
});

app.delete('/admin/loaisp/:id', function(req, res) {
    let id= req.params.id;
    let sql = 'DELETE FROM loai WHERE id = ?';
    db.query(sql, id, (err, d) => {
        if (err) res.json({"thongbao":"Lỗi khi xóa loai sp", err }); 
        else res.json({"thongbao":"Đã xóa loai sp" });
    });
});
