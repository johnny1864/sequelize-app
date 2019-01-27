const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const squelize = require('sequelize');
const op = squelize.Op;

// GET GIGS FROM DB
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.render('gigs', {
        gigs
      });
    })
    .catch(err => console.log(err));
});

// SEARCH ROUTE
router.get('/search', (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => console.log('error ', err));
});

//DISPLAY ADD FORM
router.get('add', (req, res) => res.render('add'));

// ADD GIG TO DB
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  // VALIDATION
  let errors = [];
  if (!title) {
    errors.push({ text: 'Please Add a Title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please Add a Technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please Add a Description' });
  }
  if (!budget) {
    budget = 'Undecided';
  }
  if (!contact_email) {
    errors.push({ text: 'Please Add a Email' });
  }

  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    technologies = technologies.toLowerCase();

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
  }
});

module.exports = router;
