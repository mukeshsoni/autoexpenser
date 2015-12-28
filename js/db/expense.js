var db = require('./sqlite').db;
var _ = require('lodash');
const KEY_EXPENSE_AMOUNT = 'amount';
const KEY_EXPENSE_MERCHANT = 'merchant';
const KEY_EXPENSE_LOCATION = 'location';
const KEY_EXPENSE_NOTES = 'notes';
const KEY_EXPENSE_BANK_NAME = 'bank_name';
const KEY_EXPENSE_ACCOUNT_NUMBER = 'account_number';
const KEY_EXPENSE_CATEGORY_ID = 'category_id';
const KEY_EXPENSE_CATEGORY_NAME = 'category_name';
const KEY_EXPENSE_DATE = 'expense_date';
const KEY_EXPENSE_DAY = 'day';
const KEY_EXPENSE_MONTH = 'month';
const KEY_EXPENSE_YEAR = 'year';
const KEY_EXPENSE_SMS_ID = 'sms_id';
const KEY_EXPENSE_SMS_THREAD_ID = 'sms_thread_id';
const KEY_EXPENSE_ID = '_id';
const KEY_EXPENSE_AUDITED = 'audited';
const KEY_EXPENSE_STATE = 'state';
const KEY_EXPENSE_SMS_BODY = 'sms_body';
const KEY_EXPENSE_TIME_STAMP = 'time_stamp';
const KEY_EXPENSE_SENDER_ID = 'sender_id';

module.exports = {
  add: function(expense) {
    var INSERT_SQL = `INSERT INTO expense (${KEY_EXPENSE_AMOUNT}, ${KEY_EXPENSE_CATEGORY_NAME}, ${KEY_EXPENSE_NOTES},
      ${KEY_EXPENSE_DAY}, ${KEY_EXPENSE_MONTH}, ${KEY_EXPENSE_YEAR}) values (?, ?, ?, ?, ?, ?)`;

    expense = _.defaults(expense, {
      [KEY_EXPENSE_AMOUNT]: 10,
      [KEY_EXPENSE_CATEGORY_NAME]: 'Jewellery',
      [KEY_EXPENSE_NOTES]: 'hey there, everything alright',
      [KEY_EXPENSE_DAY]: 'monday',
      [KEY_EXPENSE_MONTH]: 'june',
      [KEY_EXPENSE_YEAR]: '2015'
    });

    db.transaction((tx) => {
      tx.executeSql(INSERT_SQL, _.values(expense), (tx, results) => {
        console.log('expense inserted into table, ', results.rows);
      }, (err) => {
        console.log('Error adding expense to table: ', err.message);
      });
    });
  }
};
