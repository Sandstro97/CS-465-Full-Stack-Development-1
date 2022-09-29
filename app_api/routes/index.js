const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('./trips')
    .get(tripsController.tripsList)
    .get(tripsController.tripsFindByCode);

model.exports = router;