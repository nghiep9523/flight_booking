var express = require('express');
var router = express.Router();
var flights = require('../models/flights');

router.get('/', function(req, res) {
  flights.getFlights(res);
});
router.post('/', function(req, res) {
	flights.addFlight(req.body, res);
})
router.get('/search', function(req, res) {
  flights.searchFlights(req.query,res);
});

module.exports = router;