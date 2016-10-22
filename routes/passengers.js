var express = require('express');
var router = express.Router();
var passengers = require('../models/passengers');

router.get('/', function(req, res) {
  passengers.getPassengers(res);
});
router.get('/:flight/:date', function(req, res) {
  passengers.getPassengersFromFlight(req.params.flight, req.params.date, res);
});
router.post('/', function(req, res) {
  passengers.addPassengers(req.body, res);
});
router.get('/:id', function(req, res) {
  passengers.getPassengersWithId(req.params.id, res);
});

module.exports = router;