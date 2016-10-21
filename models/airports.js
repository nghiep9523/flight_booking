var connection = require('../connection');

function Airports() {
  this.getAirports = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from san_bay', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.getDestinationAirport = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from san_bay where Ma = ?', id, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
}

module.exports = new Airports();