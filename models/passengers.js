var connection = require('../connection');

function Passengers() {
  this.getPassengers = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from hanh_khach', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
   this.getPassengersFromFlight = function(flight, res) {
    connection.acquire(function(err, con) {
      console.log(flight)
      con.query('select hanh_khach.MaDatCho, hanh_khach.DanhXung, hanh_khach.Ho, hanh_khach.ten from chi_tiet_chuyen_bay inner join hanh_khach on chi_tiet_chuyen_bay.MaDatCho = hanh_khach.MaDatCho where chi_tiet_chuyen_bay.MaChuyenBay = ? ', flight, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.addPassengers = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('insert into hanh_khach set ?', payload, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record creation failed'});
        } else {
          res.send({status: 0, message: 'Record creation successfully'});
        }
      });
    });
  };
}

module.exports = new Passengers();