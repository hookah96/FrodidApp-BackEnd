const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

/* GET method */
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query('SELECT * FROM addresses', (error, results) => {
        connection.release();
        res.send(results);
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* Specific GET method */
router.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `SELECT * FROM addresses WHERE id=${req.params.id}`,
        (error, results) => {
          connection.release();
          res.send(results);
        },
      );
    } catch (error) {
      console.error(`Error ${error}`);
    }
  });
});

/* POST method */
router.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      const addressInfo = [
        req.body.id,
        req.body.street,
        req.body.street_no,
        req.body.region,
        req.body.zipcode,
        req.body.country_id,
        req.body.state_id,
      ];

      connection.query(
        'INSERT INTO addresses (id, street, street_no, region, zipcode, country_id, state_id) VALUES (?)',
        [addressInfo],
        () => {
          connection.release();
          res.send('Posted successfully.');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* PUT method */
router.put('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `
    UPDATE addresses SET
    street="${req.body.street}",
    street_no="${req.body.street_no}",
    region="${req.body.region}",
    zipcode="${req.body.zipcode}",
    country_id=${req.body.country_id},
    state_id=${req.body.state_id}
    WHERE id=${req.params.id}
    `,
        () => {
          res.send('Updated entry.');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

/* DELETE method */
router.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    try {
      connection.query(
        `DELETE FROM addresses WHERE id=${req.params.id}`,
        () => {
          connection.release();
          res.send('Deleted entry.');
        },
      );
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  });
});

module.exports = router;
