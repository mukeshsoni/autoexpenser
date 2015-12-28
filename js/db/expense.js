var db = require('./sqlite').db;
var _ = require('lodash');

module.exports = {
  add: function(expense) {
    var INSERT_SQL = 'INSERT INTO expense values (?, ?, ?, ?, ?, ?)';
    db.transaction((tx) => {
      tx.executeSql(INSERT_SQL, _.values(expense), (tx, results) => {
        console.log('expense inserted into table, ', expense);
      });
    });
  }
};
