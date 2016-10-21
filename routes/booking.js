var express = require('express');
var router = express.Router();
var booking = require('../models/booking');

router.get('/info/:id', function(req, res) {
  booking.getBookingInfo(req.params.id, res);
});
router.get('/', function(req, res) {
  //TODO return view
});
router.post('/', function(req, res) {
  booking.bookFlight(req.body, res);
});
router.put('/', function(req, res) {
  booking.confirmBooking(req.body, res);
});
router.delete('/', function(req, res) {
  booking.cancelBooking(req.body, res);
});

module.exports = router;