var connection = require('../connection');

function Booking() {
  this.getBookingInfo = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select dat_ve.Ma, dat_ve.ThoiGianDatCho, dat_ve.TongTien, chi_tiet_chuyen_bay.MaChuyenBay, chi_tiet_chuyen_bay.Ngay, chi_tiet_chuyen_bay.Hang, chi_tiet_chuyen_bay.MucGia, chi_tiet_chuyen_bay.GiaBan from dat_ve, chi_tiet_chuyen_bay where dat_ve.Ma = ? and dat_ve.Ma = chi_tiet_chuyen_bay.MaDatCho', id, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.bookFlight = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('insert into dat_ve set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record creation failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };

  this.confirmBooking = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('update dat_ve set TrangThai = 1 where Ma = ?', id, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record update failed'});
        } else {
          res.send({status: 0, message: 'Record updated successfully'});
        }
      });
    });
  };

  this.cancelBooking = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('delete from dat_ve where id = ?', id, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Booking();