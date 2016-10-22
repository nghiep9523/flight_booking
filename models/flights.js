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
      payload.ThongTinVe = null;
      con.query('insert into chuyen_bay set ?', payload, function(err, result) {
         if (err) {
          con.release();
          console.log(err);
          res.send({status: 1, message: 'Record creation failed'});
        } else {  
          console.log("successfully");
          res.send({status: 0, message: 'Record creation successfully'});
      }
    });
  });
};
  this.searchFlights = function(query, res) {
    connection.acquire(function(err, con) {
      con.query('select chuyen_bay.Ma, chuyen_bay.Ngay, chuyen_bay.Gio, chuyen_bay.ThoiGianBay from chuyen_bay inner join thong_tin_chuyen_bay where chuyen_bay.Ma = thong_tin_chuyen_bay.Ma and thong_tin_chuyen_bay.NoiDi = ? and thong_tin_chuyen_bay.NoiDen = ? and chuyen_bay.Ngay = ?', [query.from, query.to, query.date], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  this.updateFlight = function(request, res) {
    connection.acquire(function(err, con) {
      con.query('UPDATE chuyen_bay SET Ma = ?, Ngay = ?, Gio = ?, ThoiGianBay = ? WHERE Ma = ?',
     [request.MaCBMoi,  request.Ngay, request.Gio, request.ThoiGianBay,  request.MaCB], function(err, result) {
         if (err) {
          res.send({status: 1, message: 'Record update failed'});
        } else {
          res.send({status: 0, message: 'Record update successfully'});
        }
      });
    });
  };
  this.deleteFlight = function(payload, res) {
    connection.acquire(function(err, con) {
      //Delete all remaining tickets of the flight
       con.query('delete t, u, w from chuyen_bay t left outer join loai_ve w on t.ThongTinVe = w.Ma left join thong_tin_ve u on w.MaThongTin = u.Ma where t.Ma = ? and t.Ngay = ?', [payload.flight, payload.date] , function(err, result) {     
         if (err) {
          console.log(err);
          res.send({status: 1, message: 'Record deletion failed'});
        } else {
            con.query('delete t, w from hanh_khach t inner join chi_tiet_chuyen_bay w on t.MaDatCho = w.MaDatCho where w.MaChuyenBay = ? and w.Ngay = ?', [payload.flight, payload.date] , function(err, result) {     
                 con.release();
                 if (err) {
                  res.send({status: 1, message: 'Record deletion failed'});
                } else {
                 res.send({status: 0, message: 'Record deletion successfully'});
                }
              });
          }
     });
  });
};

  this.getFlightsInfo = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from thong_tin_chuyen_bay', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
   this.addFlightInfo = function(payload, res) {
    connection.acquire(function(err, con) {


      con.query('insert into thong_tin_chuyen_bay set ?', payload , function(err, result) {
        con.release();
         if (err) {
          res.send({status: 1, message: 'Record update failed'});
        } else {
          res.send({status: 0, message: 'Record update successfully'});
        }
      });
    });
  };
  this.updateFlightInfo = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('update thong_tin_chuyen_bay set ?', payload , function(err, result) {
        con.release();
         if (err) {
          res.send({status: 1, message: 'Record update failed'});
        } else {
          res.send({status: 0, message: 'Record update successfully'});
        }
      });
    });
  };
  this.deleteFlightInfo = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('delete from thong_tin_chuyen_bay where Ma = ?', payload.Ma , function(err, result) {
        con.release();
         if (err) {
          res.send({status: 1, message: 'Record deletion failed'});
        } else {
          res.send({status: 0, message: 'Record deletion successfully'});
        }
      });
    });
  };

  this.getFlightDetail = function(payload, res) {
    connection.acquire(function(err, con) {
      con.query('select * from chi_tiet_chuyen_bay where Ma = ?', payload, function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
}

module.exports = new Flights();