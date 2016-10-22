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
            con.query('insert into chuyen_bay set ?', payload, function(err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Record creation failed' });
                } else {
                    res.send({ status: 0, message: 'Record creation successfully' });
                }
            });
        });
    };
    this.searchFlights = function(query, res) {
        connection.acquire(function(err, con) {
            con.query('select chuyen_bay.Ma, chuyen_bay.Ngay, chuyen_bay.Gio, chuyen_bay.ThoiGianBay, chi_tiet_chuyen_bay.Hang, chi_tiet_chuyen_bay.MucGia, chi_tiet_chuyen_bay.GiaBan from chuyen_bay inner join thong_tin_chuyen_bay inner join chi_tiet_chuyen_bay where chuyen_bay.Ma = thong_tin_chuyen_bay.Ma and chuyen_bay.Ma = chi_tiet_chuyen_bay.MaChuyenBay and thong_tin_chuyen_bay.NoiDi = ? and thong_tin_chuyen_bay.NoiDen = ? and chuyen_bay.Ngay = ?', [query.from, query.to, query.date], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };
    this.updateFlight = function(payload, res) {
        connection.acquire(function(err, con) {
            con.query('update chuyen_bay set ?', payload, function(err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Record update failed' });
                } else {
                    res.send({ status: 0, message: 'Record update successfully' });
                }
            });
        });
    };
    this.deleteFlight = function(payload, res) {
        connection.acquire(function(err, con) {
            con.query('delete from chuyen_bay where Ma = ?', payload, function(err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Record deletion failed' });
                } else {
                    res.send({ status: 0, message: 'Record deletion successfully' });
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
            con.query('insert into thong_tin_chuyen_bay set ?', payload, function(err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Record update failed' });
                } else {
                    res.send({ status: 0, message: 'Record update successfully' });
                }
            });
        });
    };
    this.updateFlightInfo = function(payload, res) {
        connection.acquire(function(err, con) {
            con.query('update thong_tin_chuyen_bay set ?', payload, function(err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Record update failed' });
                } else {
                    res.send({ status: 0, message: 'Record update successfully' });
                }
            });
        });
    };
    this.deleteFlightInfo = function(payload, res) {
        connection.acquire(function(err, con) {
            con.query('delete from thong_tin_chuyen_bay where Ma = ?', payload.Ma, function(err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Record deletion failed' });
                } else {
                    res.send({ status: 0, message: 'Record deletion successfully' });
                }
            });
        });
    };

    this.addFlightDetail = function(payload, res) {
        console.log(payload);
        connection.acquire(function(err, con) {
            con.query('insert into chi_tiet_chuyen_bay set ?', payload, function(err, result) {
                con.release();
                console.log(err);
                if (err) {
                    res.send({ status: 1, message: 'Record update failed' });
                } else {
                    res.send({ status: 0, message: 'Record update successfully' });
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
