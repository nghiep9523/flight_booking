var express = require('express');
var router = express.Router();
var tickets = require('../models/tickets');

router.get('/', function(req, res) {
  tickets.getTickets(res);
});
router.post('/', function(req, res) {
	tickets.addTicket(req.body, res);
})
router.put('/', function(req, res) {
  tickets.updateTicket(req.body,res);
});
router.delete('/', function(req, res) {
  tickets.deleteTicket(req.body,res);
});

router.get('/info/:id', function(req, res) {
  tickets.getTicketsInfo(req.params.id, res);
});
router.post('/info', function(req, res) {
  tickets.addTicketInfo(req.body,res);
});
router.put('/info', function(req, res) {
  tickets.updateTicketInfo(req.body,res);
});
router.delete('/info', function(req, res) {
  tickets.deleteTicketInfo(req.body,res);
});


module.exports = router;