var connection = require('../connection');

function Flights() {
  this.getFlights = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from chuyen_bay', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
   this.addFlight = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('insert into chuyen_bay set ?', payload , function(err, result) {
        con.release();
         if (err) {
          res.send({status: 1, message: 'Record creation failed'});
        } else {
          res.send({status: 0, message: 'Record creation successfully'});
        }
      });
    });
  };
  this.searchFlights = function(query, res) {
    connection.acquire(function(err, con) {
      con.query('select chuyen_bay.Ma, chuyen_bay.Ngay, chuyen_bay.Gio, chuyen_bay.ThoiGianBay from chuyen_bay inner join thong_tin_chuyen_bay where chuyen_bay.Ma = thong_tin_chuyen_bay.Ma and thong_tin_chuyen_bay.NoiDi = ? and thong_tin_chuyen_bay.NoiDen = ?', [query.from, query.to], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
}

module.exports = new Flights();