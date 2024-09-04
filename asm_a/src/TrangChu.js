import React, { useEffect, useState } from 'react';
function TrangChu() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/admin/sp')
      .then(response => response.json())
      .then(data => {
        setTotal(data.total);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <section class="content">
        

    <div className="container-fluid pt-4 px-4">
    <div className="row g-4 justify-content-center">
  <div className="col-auto">
    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
      <i className="fa fa-chart-line fa-3x text-primary"></i>
      <div className="ms-3">
        <p className="mb-2">Sản phẩm</p>
        <h6 className="mb-0">{total}</h6>
      </div>
    </div>
  </div>
  <div className="col-auto">
    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
      <i className="fa fa-chart-bar fa-3x text-primary"></i>
      <div className="ms-3">
        <p className="mb-2">Loại sản phẩm</p>
        <h6 className="mb-0">$1234</h6>
      </div>
    </div>
  </div>
  <div className="col-auto">
    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
      <i className="fa fa-chart-area fa-3x text-primary"></i>
      <div className="ms-3">
        <p className="mb-2">Đơn hàng</p>
        <h6 className="mb-0">$1234</h6>
      </div>
    </div>
  </div>
  <div className="col-auto">
    <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
      <i className="fa fa-chart-pie fa-3x text-primary"></i>
      <div className="ms-3">
        <p className="mb-2">Doanh thu</p>
        <h6 className="mb-0">$1234</h6>
      </div>
    </div>
  </div>
</div>


      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Recent Sales</h6>
            <a href="#">Show All</a>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col"><input className="form-check-input" type="checkbox" /></th>
                  <th scope="col">Date</th>
                  <th scope="col">Invoice</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href="#">Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href="#">Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href="#">Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href="#">Detail</a></td>
                </tr>
                <tr>
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>01 Jan 2045</td>
                  <td>INV-0123</td>
                  <td>Jhon Doe</td>
                  <td>$123</td>
                  <td>Paid</td>
                  <td><a className="btn btn-sm btn-primary" href="#">Detail</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default TrangChu;
