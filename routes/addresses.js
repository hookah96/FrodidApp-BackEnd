const express = require('express');
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

/* GET method */
router.get('/', [auth, admin], (req, res) => {
  try {
    let data;
    let pageLength;

    if (Object.keys(req.query).length !== 2) {
      pool.query('SELECT * FROM a007_addresses', (error, results) => {
        res.send(results);
      });
    } else {
      pool.query('SELECT Count(*) FROM a007_addresses', (error, results) => {
        data = results.rows[0].count;
      });

      pool.query(
        `SELECT * FROM a007_addresses LIMIT ${req.query.pageSize} OFFSET ${
        (req.query.pageIndex) * req.query.pageSize
        }`,
        (error, results) => {
          pageLength = data / req.query.pageSize;
          res.send({
            total: data,
            data: results.rows,
            pages_length: pageLength,
            pageSize: req.query.pageSize,
          });
        }
      );
    }
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

/* Specific GET method */
router.get('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a007_addresses WHERE id=${req.params.id}`,
      (error, results) => {
        res.send(results);
      }
    );
  } catch (error) {
    console.error(`Error ${error}`);
  }
});

/* POST method */
router.post('/', [auth, admin], (req, res) => {
  try {
    pool.query(
      `INSERT INTO a007_addresses (street, street_no, region, zipcode, country_id, state_id) 
      VALUES ('${req.body.street}',
    '${req.body.street_no}',
    '${req.body.region}',
    '${req.body.zipcode}',
    ${req.body.country_id},
    ${req.body.state_id})`,
      () => {
        res.send('Posted successfully.');
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* PUT method */
router.put('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `
    UPDATE a007_addresses SET
    street='${req.body.street}',
    street_no='${req.body.street_no}',
    region='${req.body.region}',
    zipcode='${req.body.zipcode}',
    country_id=${req.body.country_id},
    state_id=${req.body.state_id}
    WHERE id=${req.params.id}
    `,
      () => {
        res.send('Updated entry.');
        //pool.end();
      }
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

/* DELETE method */
router.delete('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(`DELETE FROM a007_addresses WHERE id=${req.params.id}`, () => {
      res.send('Deleted entry.');
      //pool.end();
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

module.exports = router;
// -----------------------
//  MYSQL
// -----------------------
// /* GET method */
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM addresses', (error, results) => {
//         connection.release();
//         res.send(results);
//       });
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

// /* Specific GET method */
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM addresses WHERE id=${req.params.id}`,
//         (error, results) => {
//           connection.release();
//           res.send(results);
//         }
//       );
//     } catch (error) {
//       console.error(`Error ${error}`);
//     }
//   });
// });

// /* POST method */
// router.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       const addressInfo = [
//         req.body.id,
//         req.body.street,
//         req.body.street_no,
//         req.body.region,
//         req.body.zipcode,
//         req.body.country_id,
//         req.body.state_id,
//       ];

//       connection.query(
//         'INSERT INTO addresses (id, street, street_no, region, zipcode, country_id, state_id) VALUES (?)',
//         [addressInfo],
//         () => {
//           connection.release();
//           res.send('Posted successfully.');
//         }
//       );
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

// /* PUT method */
// router.put('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `
//     UPDATE addresses SET
//     street="${req.body.street}",
//     street_no="${req.body.street_no}",
//     region="${req.body.region}",
//     zipcode="${req.body.zipcode}",
//     country_id=${req.body.country_id},
//     state_id=${req.body.state_id}
//     WHERE id=${req.params.id}
//     `,
//         () => {
//           res.send('Updated entry.');
//         }
//       );
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });

// /* DELETE method */
// router.delete('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     connection.query(
//       `DELETE FROM addresses WHERE id=${req.params.id}`,
//       (error) => {
//         connection.release();
//         if (error) throw error;
//         res.send('Entry deleted.');
//       }
//     );
//     try {
//       connection.query(
//         `DELETE FROM addresses WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Deleted entry.');
//         }
//       );
//     } catch (error) {
//       console.error(`Error: ${error}`);
//     }
//   });
// });
