var connection = require('../connection');

function Airports() {
  this.getAirports = function(res) {
    connection.acquire(function(err, con) {
      if (err) throw err;
      con.query('select * from san_bay', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getDestinationAirport = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from san_bay inner join (thong_tin_chuyen_bay) where san_bay.Ma = thong_tin_chuyen_bay.NoiDen and thong_tin_chuyen_bay.NoiDi = ?', id, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
}

module.exports = new Airports();