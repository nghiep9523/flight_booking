var connection = require('../connection');

function Tickets() {
  this.getTickets = function(req, res) {
    connection.acquire(function(err, con) {
      //console.log(req);
      //  console.log(req.date);
      con.query('select loai_ve.Ma, Hang, MucGia, SoLuong, GiaBan from chuyen_bay inner join loai_ve inner join thong_tin_ve on chuyen_bay.ThongTinVe = loai_ve.Ma and loai_ve.MaThongTin = thong_tin_ve.Ma where chuyen_bay.Ma = ? and chuyen_bay.Ngay = ?', [req.flight, req.date], function(err, result) {
        con.release();
        if (err) {console.log(err)};
        //console.log(result);
        res.send(result);
      });
    });
  };
  this.addTicket = function(payload, res) {
    connection.acquire(function(err, con) {
       console.log("Hello world");
      con.query('insert into thong_tin_ve values (?, ?, ?, ?)', [payload.MaThongTin, payload.MucGia, payload.SoLuong, payload.GiaBan], function(err, result) {
        //con.release();
        if (err) {
          con.release();
          console.log(err);
          res.send({status: 1, message: 'Record created failed'});
        } else {
           con.query('insert into loai_ve values (?, ?, ?)', [payload.Ma, payload.LoaiVe, payload.MaThongTin], function(err, result) {
        //con.release();
        /*if (err) {
          con.release();
          console.log(err);
          res.send({status: 1, message: 'Record created failed'});
        } else {*/
            con.query('update chuyen_bay set ThongTinVe = ? where Ma = ? and Ngay = ?', [payload.Ma, payload.MaCB, payload.date], function(err, result) {
            con.release();
        if (err) {
           console.log(err);
          res.send({status: 1, message: 'Record created failed'});
        } else {
            res.send({status: 0, message: 'Record created successfully'});
          }
        });
          //}
        });
          //res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };
  this.updateTicket = function(payload, res) {
    connection.acquire(function(err, con) {
      console.log(payload);
      con.query('update loai_ve t left join thong_tin_ve w on t.MaThongTin = w.Ma set t.Hang = ?, w.MucGia = ?, w.SoLuong = ?, w.GiaBan = ? where t.Ma = ? and t.Hang = ? and w.MucGia = ?', [payload.LoaiVe, payload.MucGia, payload.SoLuong, payload.GiaBan, payload.Ma, payload.LoaiVeCu, payload.MucGiaCu], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
          console.log(err);
        } else {
          res.send({status: 0, id: payload.Ma, message: 'Record created successfully'});
        }
      });
    });
  };

  this.deteleTicket = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('delete from loai_ve where Ma = ?', payload.Ma, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record updated failed'});
        } else {
          res.send({status: 0, message: 'Record updated successfully'});
        }
      });
    });
  };

  this.getTicketsInfo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from thong_tin_ve where Ma = ?', id ,function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.addTicketInfo = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('insert into thong_tin_ve set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };
  this.updateTicketInfo = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('update thong_tin_ve set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };

  this.deteleTicketInfo = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('delete from dat_ve where Ma = ?', payload.Ma, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record updated failed'});
        } else {
          res.send({status: 0, message: 'Record updated successfully'});
        }
      });
    });
  };

  this.getTicketsInFlight = function(flight, date,res) {
    connection.acquire(function(err, con) {
      con.query('select dat_ve.Ma, dat_ve.ThoiGian, dat_ve.TongTien, dat_ve.TrangThai from chi_tiet_chuyen_bay inner join dat_ve on chi_tiet_chuyen_bay.MaDatCho = dat_ve.Ma where chi_tiet_chuyen_bay.MaChuyenBay = ? and chi_tiet_chuyen_bay.Ngay = ?', [flight,date], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
}

module.exports = new Tickets();