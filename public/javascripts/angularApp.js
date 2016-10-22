'use strict';
var app = angular.module('bt1', ['ui.router']);
var update = 1;
var insertError = 0;
var sanbaydi = "";
var sanbayden = "";
var ngaybay = "";
var Flights = [];
var FlightInfo = []; //Don't need to load if it exists
function loadData(scope, http)
{
	  insertError = 0;
	  scope.listStudents = [];
	  http.get('/airports')
	 .success(function(data) {
	 	for (var i = 0; i < data.length; i++) 
	 	{
	 		var item = {};
	 		item.Ma = data[i].Ma;
	 		item.TenDiaDanh = data[i].TenDiaDanh;
	 		item.TenSanBay = data[i].TenSanBay;
	 		item.SanBayDen = data[i].SanBayDen;
	 		scope.listStudents.push(item);
	 	}
	 	//scope.text = item;
	 	//console.log(data);
	 })
	 .error(function(data, status) {
  			//scope.text = "Error: " + data;
		});
}

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('flightschedule', {
			url : '/flightschedule',
			templateUrl : '/flightschedule.html',
			controller : 'FlightScheduleCtrl',
		})
		.state('404', {
			url : '/404',
			templateUrl : '/404.html',
			controller : 'MainCtrl',
			
		})
		.state('flight', {
			url : '/flight',
			templateUrl : '/flight.html',
			controller : 'FlightCtrl',
			
		})
		.state('ticketmanage', {
			url : '/ticketmanage',
			templateUrl : '/ticketmanage.html',
			controller : 'TicketCtrl',
		})
		//$urlRouterProvider.otherwise('flightschedule');
}]);



function loadFlights(scope, http)
{
	  insertError = 0;
	  scope.listFlights = [];
	  http.get('/flights')
	 .success(function(data) {
	 	for (var i = 0; i < data.length; i++) 
	 	{
	 		var item = {};
	 		item.Ma = data[i].Ma;
	 		item.Ngay = data[i].Ngay;
	 		item.Gio = data[i].Gio;
	 		item.ThoiGianBay = data[i].ThoiGianBay;
	 		item.ThongTinVe = data[i].ThongTinVe;
	 		scope.listFlights.push(item);
	 	}
	 })
	 .error(function(data, status) {
  			//scope.text = "Error: " + data;
		});
}

function loadFlightInfo(scope, http)
{
	 scope.flightsInfo = [];
	 http.get('/flights/info')
	 .success(function(data) {
	 	for (var i = 0; i < data.length; i++) 
	 	{
	 		var item = {};
	 		item.Ma = data[i].Ma;
	 		item.Ngay = data[i].NoiDi;
	 		item.Gio = data[i].NoiDen;
	 		item.ThoiGianBay = data[i].QuaCanh;
	 		scope.flightsInfo.push(item);
	 	}
	 })
	 .error(function(data, status) {
  			//scope.text = "Error: " + data;
		});
}

function loadTickets(scope, http, flight)
{
		$scope.Tickets = [];
	 	$http.get('/tickets?flight='+flight+ '&date=2016-10-22')
	 	.success(function(data) {
	 	for (var i = 0; i < data.length; i++) 
	 	{
	 		var item = {};
	 		item.LoaiVe = data[i].Hang;
	 		item.MucGia = data[i].MucGia;
	 		item.SoLuong = data[i].SoLuong;
	 		item.GiaBan = data[i].GiaBan;
	 		$scope.Tickets.push(item);
	 	}
	 });
}

app.controller('MainCtrl',['$scope', '$http', function($scope, $http)
{
	var currentTab = 'tab1';
     $scope.changeState = function(s)
     {
     	$('#' + currentTab).removeClass("active");
     	$('#' + s).addClass("active");
     	currentTab = s;
     }

     $scope.isUpdate = function()
     {
     	if (update == 1) return true;
     	return false;
     };

     $scope.dismissModal = function(s)
     {
     	$('#' + s).modal('hide');
     };
}]);

app.controller('FlightCtrl', [
'$scope',
function($scope){
 
}]);

app.controller('FlightScheduleCtrl',['$scope', '$http', function($scope, $http){

	loadFlights($scope, $http);
 	$scope.deleteFlight = function(flight, date) {
 		var sendData = {};
 		sendData.flight = flight;
 		sendData.date = "2016-10-22";
	 	 $http.delete('/flights?flight=' + flight + "&date=2016-10-22")
	 	 .success(function(data) {
	 	 	//$scope.text = "Delete student with id = " + d + " successful";
	 	 	loadFlights($scope, $http);
	 	 })
	 	 .error(function(data, status) {
  			//$scope.text = "Error: " + data;
		 });
	 };

	 $scope.fillUpdate= function(id)
	 {
	 	insertError = 0;
	 	loadFlightInfo($scope, $http);
	 	$scope.title = "Chỉnh sửa";
	 	update = 1;
	 	$('#flightCode').text($scope.listFlights[id].Ma);
		document.getElementById("date").value = $scope.listFlights[id].Ngay;
		document.getElementById("time").value = $scope.listFlights[id].Gio;
		document.getElementById("flightTime").value = $scope.listFlights[id].ThoiGianBay;
		$scope.sid = $scope.listFlights[id].Ma;
	 }

 	 $scope.updateFlight = function(id)
	 {
		 	var temp = {};
		 	temp.MaCB = id;
		 	temp.MaCBMoi = $('#flightCode').text();
		 	temp.Ngay = document.getElementById("date").value;
		 	temp.Gio = document.getElementById("time").value;
		 	temp.ThoiGianBay = document.getElementById("flightTime").value;
		 	$http.put('/flights', temp)
		 	.success(function(data)
		 	{
		 		//$scope.text = "Update successful";
		 		loadFlights($scope, $http);
		 	})
		 	.error(function(data, status) {
	  			//$scope.text = "Error: " + data;
			});
	 }

	 $scope.fillInsert = function()
	 {
	 	update = 0;
	 	loadFlightInfo($scope, $http);
	 	$scope.title = "Thêm chuyến bay";
 		if (insertError == 0)
 		{
 			$('#flightCode').text("Chọn mã chuyến bay");
 			document.getElementById("date").value = "";
 			document.getElementById("time").value = "";
 			document.getElementById("flightTime").value = "";
 		}
	 }

     $scope.insertFlight = function()
     {
     	if ($('#flightCode').text() != 'Chọn mã chuyến bay')
     	{
     		var temp = {};
		 	temp.Ma = $('#flightCode').text();
		 	temp.Ngay = document.getElementById("date").value;
		 	temp.Gio = document.getElementById("time").value;
		 	temp.ThoiGianBay = document.getElementById("flightTime").value;
		 	$http.post('/flights', temp)
		 	.success(function(data)
		 	{
		 		//$scope.text = "Insert successful";
		 		loadFlights($scope, $http);
		 	})
		 	.error(function(data, status) {
	  			//$scope.text = "Error: " + data;
	  			insertError = 1;
			});
     	}
     	else
     	{
     		//$scope.text = "ID can not be null";
     		insertError = 1;
     	} 
     };

     $scope.fillUpdateTicket = function(id)
     {
     	update = 1;
	 	$scope.title1 = "Chỉnh sửa vé";
		document.getElementById("type").value = $scope.Tickets[id].LoaiVe;
		document.getElementById("priceLevel").value = $scope.Tickets[id].MucGia;
		document.getElementById("number").value = $scope.Tickets[id].SoLuong;
		document.getElementById("price").value = $scope.Tickets[id].GiaBan;
		$scope.sid = $scope.Tickets[id].Ma;
		$scope.ticketType = document.getElementById("type").value;
		$scope.pLevel = document.getElementById("priceLevel").value;
     }

	   $scope.fillInsertTicket = function()
	   {
	   		update = 0;
	   		$scope.title1 = "Thêm vé";

	   		document.getElementById("type").value = "";
			document.getElementById("priceLevel").value = "";
			document.getElementById("number").value = "";
			document.getElementById("price").value = "";
	   }

	   $scope.updateTicket = function(id, type, pLevel)
	   {
	   		var temp = {};
		 	temp.Ma = id;
		 	temp.LoaiVeCu = type;
		 	temp.MucGiaCu = pLevel;
		 	temp.LoaiVe = document.getElementById("type").value;
		 	temp.MucGia = document.getElementById("priceLevel").value;
		 	temp.SoLuong = document.getElementById("number").value;
		 	temp.GiaBan = document.getElementById("price").value;
		 	$http.put('/tickets', temp)
		 	.success(function(data)
		 	{
		 		//$scope.text = "Update successful";
		 		loadTickets($scope, $http);
		 	})
		 	.error(function(data, status) {
	  			//$scope.text = "Error: " + data;
			});
	   }

	   $scope.insertTicket = function(flight, date)
	   {
		   	if (document.getElementById("type").value == 'Y' || document.getElementById("type").value == 'C')
	     	{
	     		var temp = {};
	     		temp.MaCB = flight;
	     		temp.Ngay = date;
	     		temp.Ma = flight + date;
			 	temp.LoaiVe = document.getElementById("type").value;
			 	temp.MaThongTin = temp.Ma + temp.LoaiVe;
			 	temp.MucGia = document.getElementById("priceLevel").value;
			 	temp.SoLuong = document.getElementById("number").value;
			 	temp.GiaBan = document.getElementById("price").value;
			 	$http.post('/tickets', temp)
			 	.success(function(data)
			 	{
			 		loadTickets($scope, $http);
			 	})
			 	.error(function(data, status) {

				});
	     	}
	     	else
	     	{
	     		//$scope.text = "ID can not be null";
	     		insertError = 1;
	     	} 
	   }

     $(function(){
	  $('#id').keypress(function(e){
	    if((e.which >= 65 && e.which <= 90) || (e.which >= 97 && e.which <= 122) || (e.which >= 48 && e.which <= 57)) {
	    } else {
	      return false;
	    }
  	  });
	});

     $scope.chooseFlight = function(s)
     {
     	$('#flightCode').text(s);
     }

     $scope.loadTicketTypeInfo = function(flight, date)
     {
     	$scope.f = flight;
     	$scope.d = '2016-10-22';
     	$scope.Tickets = [];
	 	$http.get('/tickets?flight='+flight+ '&date=2016-10-22')
	 	.success(function(data) {
	 	for (var i = 0; i < data.length; i++) 
	 	{
	 		var item = {};
	 		item.Ma = data[i].Ma;
	 		item.LoaiVe = data[i].Hang;
	 		item.MucGia = data[i].MucGia;
	 		item.SoLuong = data[i].SoLuong;
	 		item.GiaBan = data[i].GiaBan;
	 		$scope.Tickets.push(item);
	 	}
	 })
	 .error(function(data, status) {
  			//scope.text = "Error: " + data;
		});
     }


}]);

app.controller('TicketCtrl', [
'$scope',
function($scope){
	 $('#flight').hide();
     $scope.changeViewMode = function(s)
     {
     	if (s == '1')
     	{
     		 $('#viewMode').text('Xem theo mã đặt chỗ');
     		 $('#flight').hide();
     		 $('#code').show();
     	}
     	else
     	{ 
     		 $('#viewMode').text('Xem theo chuyến bay');
     		 $('#flight').show();
     		 $('#code').hide();
     	} 
     }
}]);