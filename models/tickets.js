var connection = require('../connection');

function Tickets() {
  this.getTickets = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from loai_ve', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.addTicket = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('insert into loai_ve set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
        }
      });
    });
  };
  this.updateTicket = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('update loai_ve set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record created failed'});
        } else {
          res.send({status: 0, message: 'Record created successfully'});
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