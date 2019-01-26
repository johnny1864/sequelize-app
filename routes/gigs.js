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

// ADD GIG TO DB
router.get('/add', (req, res) => {
  const data = {
    title: 'Wordpress Developer',
    technologies: 'Wordpress, javascript, html, css',
    budget: '$1000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis commodo, nulla at tristique luctus, neque felis malesuada odio, quis tempus metus enim ac magna. Maecenas blandit imperdiet cursus. Ut porttitor augue quis urna congue mattis. Sed pulvinar orci sed fringilla condimentum. Nam faucibus vel lacus vel posuere. Curabitur erat leo, congue eu convallis quis, mollis sed nisl. Fusce nunc elit, egestas ac ligula nec, dignissim bibendum libero',
    contact_email: 'user2@gmail.com'
  };

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
});

module.exports = router;
