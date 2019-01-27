const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// GET GIGS FROM DB
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.render('gigs', {
        gigs
      });
      // res.sendStatus(200);
    })
    .catch(err => console.log(err));
});

//DISPLAY ADD FORM
router.get('add', (req, res) => res.render('add'));

// ADD GIG TO DB
router.post('/add', (req, res) => {
  let data = req.body;

  let { title, technologies, budget, description, contact_email } = data;

  // INSERT INTO TABLE
  Gig.create({
    title,
    technologies,
    budget,
    description,
    contact_email
  })
    .then(gig => res.redirect('/gigs'))
    .catch(err => console.log(err));

  // REDIRECT TO HOME PAGE
  res.redirect('/');
});

module.exports = router;
