var express = require('express');
var router = express.Router();
var passengers = require('../models/passengers');

router.get('/', function(req, res) {
  passengers.getPassengers(res);
});
router.get('/:flight', function(req, res) {
  passengers.getPassengersFromFlight(req.params.flight, res);
});
router.post('/', function(req, res) {
  passengers.addPassengers(req.body, res);
});

module.exports = router;