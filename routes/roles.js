const express = require('express');
const pool = require('../connection/connection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

// POSTGRESQL GET METHOD
router.get('/', [auth, admin], (req, res) => {
  try {
      pool.query('SELECT * FROM a001_roles', (err, results) => {
        res.send(results);
      });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// PG GET METHOD WITH ID
router.get('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a001_roles WHERE id=${req.params.id}`,
      (err, results) => {
        res.send(results);
        //pool.end();
      }
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

// PG POST METHOD
router.post('/', [auth, admin], (req, res) => {
  try {
    pool.query(
      `INSERT INTO a001_roles (name) VALUES ('${req.body.name}')`,
      () => {
        res.send('Entry added.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG PUT METHOD
router.put('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(
      `UPDATE a001_roles SET name='${req.body.name}' WHERE id=${req.params.id}`,
      () => {
        res.send('Entry updated.');
        //pool.end();
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

//  PG DELETE METHOD
router.delete('/:id', [auth, admin], (req, res) => {
  try {
    pool.query(`DELETE FROM a001_roles WHERE id=${req.params.id}`, () => {
      res.send('Entry deleted.');
      //pool.end();
    });
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

module.exports = router;

// -----------------------------------------------------------------------
// MYSQL

// Get Method MYSQL
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM roles', (error, results) => {
//         connection.release();
//         res.send(results);
//       });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// Get with id Method MYSQL
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM roles WHERE id=${req.params.id}`,
//         (error, results) => {
//           connection.release();
//           res.send(results);
//         }
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// MYSQL Post Method
// router.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `INSERT INTO roles (name) VALUES ("${req.body.name}")`,
//         () => {
//           connection.release();
//           res.send('Entry added.');
//         }
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// SQL Put Method
// router.put('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `UPDATE roles SET name="${req.body.name}" WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Entry updated.');
//         });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// MYSQL Delete Method
// router.delete('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(`DELETE FROM roles WHERE id=${req.params.id}`, () => {
//         connection.release();
//         res.send('Entry deleted.');
//       });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });
