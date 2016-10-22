'use strict';
var app = angular.module('bt1', ['ui.router']);
var update = 1;
var insertError = 0;
var sanbaydi = "";
var sanbayden = "";
var ngaybay1 = "";
var ngaybay2 = "";
var listFlighs_temp1 = [];
var listFlighs_temp2 = [];
var dia_danh_di = "";
var dia_danh_den = "";
var isKhuHoi = true;
var stt = 0;
var chooseFlight = [];
var sohanhkhach = 0;
var tongtien = 0;
var madatcho;

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/templates/home.html',
                controller: 'MainCtrl'
            })
            .state('listflighs', {
                url: '/listflighs',
                templateUrl: '/templates/list_flight.html',
                controller: 'FlightCtrl'
            })
            .state('infoCustomer', {
                url: '/infocustomer',
                templateUrl: '/templates/passenger.html',
                controller: 'PassengerCtrl'
            })
        $urlRouterProvider.otherwise('home');
        // body...
    }
]);

function loadData(scope, http) {
    insertError = 0;
    scope.listStudents = [];
    document.getElementById("onl_booking").style.display = "inline-block";
    http.get('/airports')
        .success(function(data) {
            for (var i = 0; i < data.length; i++) {
                var item = {};
                item.Ma = data[i].Ma;
                item.TenDiaDanh = data[i].TenDiaDanh;
                item.TenSanBay = data[i].TenSanBay;
                item.SanBayDen = data[i].SanBayDen;
                scope.listStudents.push(item);
            }
            scope.text = item;
            //console.log(data);
        })
        .error(function(data, status) {
            scope.text = "Error: " + data;
        });
}
app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    loadData($scope, $http);
    /* console.log('click');
     $scope.click = function() {
        $scope.text= 'click';

     };*/

    $(document).ready(function() {

        $("#example1").datepicker({ startDate: new Date(), dateFormat: 'yy-mm-dd' });
        $("#example2").datepicker({ startDate: new Date() });
    });

    $scope.change_type = function(a) {
        if (a == 0) {
            document.getElementById("khuhoi").className += " btn-info";
            document.getElementById("motchieu").className -= " btn-info";
            document.getElementById("motchieu").className += " btn_in_form";
            document.getElementById("motchieu").className += " btn btn-default";

            document.getElementById("example2").style.display = "inline-block";
            document.getElementById("arrow").src = "images/arrow2.png";

            isKhuHoi = true;
        } else {
            document.getElementById("khuhoi").className -= " btn-info";
            document.getElementById("khuhoi").className += " btn_in_form";
            document.getElementById("khuhoi").className += " btn btn-default";
            document.getElementById("motchieu").className += " btn-info";
            document.getElementById("example2").required = false;
            document.getElementById("example2").style.display = "none";

            document.getElementById("arrow").src = "images/arrow1.png";

            isKhuHoi = false;
        }

    }

    $scope.chooseSanBayDi = function(flight) {
        document.getElementById("menu1").value = flight.TenDiaDanh;
        $scope.listDesStudents = [];
        sanbaydi = flight.Ma;
        dia_danh_di = flight.TenDiaDanh;
        $http.get('/airports/' + flight.Ma)
            .success(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    item.Ma = data[i].Ma;
                    item.TenSanBay = data[i].TenSanBay;
                    item.TenDiaDanh = data[i].TenDiaDanh;
                    item.SanBayDen = data[i].NoiDen;
                    $scope.listDesStudents.push(item);
                }
                $scope.text = item;
                //console.log(data);
            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            });
    }

    $scope.display_name = function(flight, a) {
        document.getElementById("menu2").value = flight.TenDiaDanh;
        sanbayden = flight.SanBayDen;
        dia_danh_den = flight.TenDiaDanh;
    }

    $scope.display_type = function(type) {
        document.getElementById("menu3").value = type;
    }


    $scope.find_flights = function() {
        var str = document.getElementById("example1").value;
        sohanhkhach = document.getElementById("sohanhkhach").value;

        listFlighs_temp1 = [];
        listFlighs_temp2 = [];
        var length1 = 0,
            length2 = 0;
        var result = str.split("-");
        ngaybay1 = result[2] + "-" + result[1] + "-" + result[0];

        $http.get('/flights/search/?from=' + sanbaydi + '&to=' + sanbayden + '&date=' + ngaybay1)
            .success(function(data) {
                document.getElementById("onl_booking").style.display = "none";
                length1 = data.length;
                if (length1 == 0) {
                    alert("Không còn vé cho chiều đi");

                }
                for (var i = 0; i < data.length; i++) {
                    var item = {};
                    var timeStr = data[i].Ngay;
                    var date = new Date(timeStr);
                    var day = date.getDate();
                    var year = date.getFullYear();
                    var month = date.getMonth()+1;
                    var dateStr = year+"-"+month+"-"+day;
                    item.Ma = data[i].Ma;
                    item.Ngay = dateStr;
                    item.Gio = data[i].Gio;
                    item.ThoiGianBay = data[i].ThoiGianBay;
                    item.Hang = data[i].Hang;
                    item.MucGia = data[i].MucGia;
                    item.GiaBan = data[i].GiaBan;
                    item.SoLuong = data[i].SoLuong;
                    listFlighs_temp1.push(item);
                }
            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            });

        if (isKhuHoi) {
            var str2 = document.getElementById("example2").value;
            var result2 = str2.split("-");
            ngaybay2 = result2[2] + "-" + result2[1] + "-" + result2[0];

            $http.get('/flights/search/?from=' + sanbayden + '&to=' + sanbaydi + '&date=' + ngaybay2)
                .success(function(data) {
                    document.getElementById("onl_booking").style.display = "none";
                    console.log();
                    length2 = data.length;
                    if (length2 == 0) {
                        alert("Không còn vé cho chiều về");
                    }

                    for (var i = 0; i < data.length; i++) {
                        var item = {};
                        console.log(data[i].Ngay);
                        item.Ma = data[i].Ma;
                        item.Ngay = data[i].Ngay;
                        item.Gio = data[i].Gio;
                        item.ThoiGianBay = data[i].ThoiGianBay;
                        item.Hang = data[i].Hang;
                        item.MucGia = data[i].MucGia;
                        item.GiaBan = data[i].GiaBan;
                        listFlighs_temp2.push(item);
                    }
                })
                .error(function(data, status) {
                    $scope.text = "Error: " + data;
                });
        }
    }

    $scope.delete = function(d) {
        $http.delete('/api/students/' + d)
            .success(function(data) {
                $scope.text = "Delete student with id = " + d + " successful";
                loadData($scope, $http);
            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            });
    };
    $scope.fill = function(id) {
        insertError = 0;
        $scope.title = "Update";
        update = 1;
        for (var i = 0; i < $scope.listStudents.length; i++)
            if ($scope.listStudents[i].id == id) {
                document.getElementById("id").value = $scope.listStudents[i].id;
                document.getElementById("name").value = $scope.listStudents[i].name;
                document.getElementById("birthday").value = $scope.listStudents[i].birthday;
                document.getElementById("gender").value = $scope.listStudents[i].gender;
                document.getElementById("address").value = $scope.listStudents[i].address;
                $scope.sid = $scope.listStudents[i].id;
                break;
            }
    }

    $scope.update = function(id) {
        if ($('#id').val() != '') {
            var temp = {};
            temp.id = id;
            temp.uid = document.getElementById("id").value;
            temp.name = document.getElementById("name").value;
            temp.birthday = document.getElementById("birthday").value;
            temp.gender = document.getElementById("gender").value;
            temp.address = document.getElementById("address").value;
            $http.put('/api/students', temp)
                .success(function(data) {
                    $scope.text = "Update successful";
                    loadData($scope, $http);
                })
                .error(function(data, status) {
                    $scope.text = "Error: " + data;
                });
        } else $scope.text = "ID can not be null";
    }

    $scope.fillInsert = function() {
        update = 0;
        $scope.title = "Insert";
        if (insertError == 0) {
            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("birthday").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("address").value = "";
        }
    }
    $scope.click = function() {
        $scope.text = 'click';
    };


    $scope.isUpdate = function() {
        if (update == 1) return true;
        return false;
    };

    $scope.insert = function() {
        if ($('#id').val() != '') {

            var temp = {};
            temp.id = document.getElementById("id").value;
            temp.name = document.getElementById("name").value;
            temp.birthday = document.getElementById("birthday").value;
            temp.gender = document.getElementById("gender").value;
            temp.address = document.getElementById("address").value;
            $http.post('/api/students', temp)
                .success(function(data) {
                    $scope.text = "Insert successful";
                    loadData($scope, $http);
                })
                .error(function(data, status) {
                    $scope.text = "Error: " + data;
                    insertError = 1;
                });
        } else {
            $scope.text = "ID can not be null";
            insertError = 1;
        }
    };

    $(function() {
        $('#id').keypress(function(e) {
            if ((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || (e.which >= 48 && e.which <= 57)) {} else {
                return false;
            }
        });
    });
}]);

function GetData(scope, http) {
    scope.data = [];
    var tam = [];
    var i = 1;

    tam.push(listFlighs_temp1);
    tam.push(dia_danh_di);
    tam.push(dia_danh_den);
    tam.push(ngaybay1);
    tam.push(i);
    scope.data.push(tam);

    if (isKhuHoi) {
        var tam1 = [];
        i = 2;
        tam1.push(listFlighs_temp2);
        tam1.push(dia_danh_den);
        tam1.push(dia_danh_di);
        tam1.push(ngaybay2);
        tam1.push(i);
        scope.data.push(tam1);
    }
}

var oldchoose = 0;
app.controller('FlightCtrl', ['$scope', '$http', function($scope, $http) {
    GetData($scope, $http);

    $scope.choose = function(flight, iForm) {
        if (oldchoose == iForm) {
            chooseFlight = [];
        }
        oldchoose = iForm;
        chooseFlight.push(flight);
    }

    $scope.booking = function() {

        stt++;
        madatcho = lpad(stt, 6);
        var item = {};
        var today = new Date();
        item.Ma = madatcho;
        item.ThoiGianDatCho = today.toISOString().substring(0, 10);

        for (var i = 0; i < chooseFlight.length; i++) {
            tongtien += chooseFlight[i].GiaBan;
        }
        item.TongTien = tongtien * sohanhkhach;
        item.TrangThai = 0;

        $http.post('/booking', item)
            .success(function(data) {
                $scope.text = "Update successful";

                for (var i = 0; i < chooseFlight.length; i++) {
                    var item1 = {};
                    item1.MaDatCho = madatcho;
                    item1.MaChuyenBay = chooseFlight[i].Ma;
                    item1.Ngay = chooseFlight[i].Ngay.substring(0, 10);
                    item1.Hang = chooseFlight[i].Hang;
                    item1.MucGia = chooseFlight[i].MucGia;
                    item1.GiaBan = chooseFlight[i].GiaBan;

                    console.log(item1.Ngay);

                    $http.post('/flights/detail', item1)
                        .success(function(data) {
                            $scope.text = "Update successful";
                        })
                        .error(function(data, status) {
                            $scope.text = "Error: " + data;
                        });
                }
            })
            .error(function(data, status) {
                $scope.text = "Error: " + data;
            });
    }
}]);

function lpad(value, padding) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
}

function creationInfoForm() {
    var i = 1;
    while (i < sohanhkhach) {
        // $("#infomation").clone().appendTo(".tongquat");
        var r = "'" + 'danhxung' + i.toString() + "'";
        var str = "<div id='infomation" + i.toString() + "' style='margin-top: 20px;'>" + "<div style='position: relative; float: left; margin-left: 100px;'>" + "<p style='font-weight: bold;'>Danh xưng</p>" + "<div class='dropdown pull-left' style='position: relative;'>" + "<input type='text' class='btn btn-default dropdown-toggle' type='button' id='danhxung" + i.toString() + "' data-toggle='dropdown' readonly required style='width: 75px;'>" + "<span class='caret'></span>" + "<ul class='dropdown-menu' role='menu' aria-labelledby='danhxung" + i.toString() + "'>" + "<li role='presentation'><a role='menuitem' tabindex='-1' onclick= " + "\"chooseDanhXung(" + r + ", 'MR')\"" + ">MR</a></li>" + "<li role='presentation'><a role='menuitem' tabindex='-1' onclick=" + "\"chooseDanhXung(" + r + " , 'MS')\"" + ">MS</a></li>" + "</ul>" + "</div>" + "</div>" + "<div style='display: inline-block; margin-left: 10px;'>" + "<p style='font-weight: bold;'>Đệm và Tên</p>" + "<input type='text' id='demvaten" + i.toString() + "' data-toggle='dropdown' required style='height: 33px'>" + "</div>" + "<div style='display: inline-block; margin-left: 10px;'>" + "<p style='font-weight: bold;'>Họ</p>" + "<input type='text' id='ho" + i.toString() + "' data-toggle='dropdown' required style='height: 33px'>" + "</div>" + "</div>";
        var t = "#infomation" + (i - 1).toString();
        $(str).insertAfter(t);
        ++i;
    }



}

var iscall = false;
app.controller('PassengerCtrl', ['$scope', '$http', function($scope, $http) {
    if (iscall == false) {
        creationInfoForm();
        iscall = true;
    }

    var listPassenger = [];
    $scope.insertPassenger = function() {
        for (var i = 0; i < sohanhkhach; i++) {
            var item = {};
            item.MaDatCho = madatcho;
            item.DanhXung = document.getElementById("danhxung" + i.toString()).value;
            item.Ho = document.getElementById("ho" + i.toString()).value;
            item.Ten = document.getElementById("demvaten" + i.toString()).value;

            $http.post('/passengers', item)
                .success(function(data) {
                    $scope.text = "Insert successful";
                })
                .error(function(data, status) {
                    $scope.text = "Error: " + data;
                });


        }
    }
}]);
