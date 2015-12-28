var SQLite = require('react-native-sqlite-storage');

const DATABASE_NAME = 'sms_expense';
const DATABASE_TABLE_EXPENSE = 'expense';
const DATABASE_TABLE_CATEGORY = 'category';
const DATABASE_TABLE_BANK = 'bank';
const DATABASE_TABLE_BUDGET = 'budget';
const DATABASE_TABLE_SMS_CATEGORY_MAPPING = 'sms_category_mapping';

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

const KEY_CATEGORY_ID = '_id';
const KEY_CATEGORY_NAME = 'name';
const KEY_CATEGORY_CREATED = 'created';

const KEY_REMINDER_ID = '_id';
const KEY_REMINDER_DATE = 'expense_date';
const KEY_REMINDER_BANK_NAME = 'bank_name';
const KEY_REMINDER_MERCHANT = 'merchant';
const KEY_REMINDER_LOCATION = 'location';
const KEY_REMINDER_AMOUNT = 'amount';
const KEY_REMINDER_DAY = 'day';
const KEY_REMINDER_MONTH = 'month';
const KEY_REMINDER_YEAR = 'year';
const KEY_REMINDER_AUDITED = 'audited';

const KEY_INCOME_ID = '_id';
const KEY_INCOME_AMOUNT = 'amount';
const KEY_INCOME_DAY = 'day';
const KEY_INCOME_MONTH = 'month';
const KEY_INCOME_YEAR = 'year';
const KEY_INCOME_NOTES = 'notes';
const KEY_INCOME_AUDITED = 'audited';

const KEY_BANK_ID = '_id';
const KEY_BANK_NAME = 'bank_name';
const KEY_BANK_SENDER_ID = 'bank_sender_id';
const KEY_BANK_DEFAULT = 'default_bank';
const KEY_BANK_PRIORITY = 'priority';

const KEY_USER_PROFILE_ID = '_id';
const KEY_USER_PROFILE_EMAIL = 'email';
const KEY_USER_PROFILE_PHONE_NUMBER = 'phone_number';
const KEY_USER_PROFILE_PHONE_MODEL = 'phone_model';
const KEY_USER_PROFILE_OS_VERSION = 'os_version';
const KEY_USER_PROFILE_DEVICE_ID = 'device_id';

const KEY_SMS_CAT_MAP_ID = '_id';
const KEY_SMS_CAT_MAP_SERVER_ID = 'server_id';
const KEY_SMS_CAT_MAP_BANK = 'bank';
const KEY_SMS_CAT_MAP_MERCHANT = 'merchant';
const KEY_SMS_CAT_MAP_CATEGORY = 'category';
const KEY_SMS_CAT_MAP_NOTES = 'notes';
const KEY_SMS_CAT_MAP_LOCAL_RULE = 'local_rule';
const KEY_SMS_CAT_MAP_PRIORITY = 'notes';

const KEY_BUDGET_ID = '_id';
const KEY_BUDGET_CATEGORY = 'category';
const KEY_BUDGET_ACCOUNT = 'account';
const KEY_BUDGET_AMOUNT = 'amount';
const KEY_BUDGET_TYPE = 'type'; // daily, weekly, bi-weekly, monthly, yearly
const KEY_BUDGET_ALERT_AMOUNT = 'alert_amount';
const KEY_BUDGET_AMOUNT_SPENT = 'amount_spent';
const KEY_BUDGET_CREATED_TIMESTAMP = 'created_timestamp';

/**
 * Database creation sql statement
 */
const DATABASE_CREATE_EXPENSE_TABLE = 'CREATE TABLE IF NOT EXISTS expense (_id integer primary key autoincrement, amount text not null, notes text, '
		+ 'bank_name text, category_id integer, '
		+ 'expense_date date default CURRENT_DATE, merchant text default \'\', location text, day integer, '
		+ 'month integer, year integer, category_name text, sms_id integer, sms_thread_id integer, '
		+ 'audited integer default 0, state text, sms_body text, time_stamp integer NOT NULL DEFAULT (strftime(\'%s\',\'now\')*1000), sender_id text);';

const DATABASE_CREATE_CATEGORY_TABLE = 'CREATE TABLE IF NOT EXISTS category (_id integer primary key autoincrement, '
		+ 'name text not null unique, created integer NOT NULL DEFAULT (strftime(\'%s\', \'now\')));';

const DATABASE_CREATE_BANK_TABLE = 'CREATE TABLE IF NOT EXISTS bank (_id integer primary key autoincrement, '
		+ 'bank_name text not null, bank_sender_id text, default_bank integer, priority integer default 10000);';

const DATABASE_CREATE_REMINDER_TABLE = 'CREATE TABLE IF NOT EXISTS reminder (_id integer primary key autoincrement, bank_name text, amount text not null, '
		+ 'merchant text, location text, expense_date date default CURRENT_DATE, day integer, month integer, year integer, audited integer);';

const DATABASE_CREATE_INCOME_TABLE = 'CREATE TABLE IF NOT EXISTS income (_id integer primary key autoincrement, amount text not null, '
		+ 'day integer, month integer, year integer, audited integer);';

const DATABASE_CREATE_USER_PROFILE_TABLE = 'CREATE TABLE IF NOT EXISTS user_profile (_id integer primary key autoincrement, '
		+ 'email text, phone_number text, phone_model text, os_version text, device_id text)';

const DATABASE_CREATE_SMS_CATEGORY_MAPPING_TABLE = 'CREATE TABLE IF NOT EXISTS sms_category_mapping (_id integer primary key autoincrement, '
		+ 'server_id integer, bank text, merchant text, category text, notes text, local_rule integer default 0, priority integer default 0)';

const DATABASE_CREATE_BUDGET_TABLE = 'CREATE TABLE IF NOT EXISTS '+DATABASE_TABLE_BUDGET+' ('+KEY_BUDGET_ID+' integer primary key autoincrement, '
		+ KEY_BUDGET_AMOUNT + ' text not null, ' + KEY_BUDGET_CATEGORY + ' text, ' + KEY_BUDGET_ACCOUNT + ' text, '
		+ KEY_BUDGET_TYPE + ' text, ' + KEY_BUDGET_ALERT_AMOUNT + ' text, ' + KEY_BUDGET_AMOUNT_SPENT + ' text default \'0\', '
		+ KEY_BUDGET_CREATED_TIMESTAMP + ' integer NOT NULL DEFAULT (strftime(\'%s\', \'now\')*1000))';

function dbOpenErrorCB(err) {
  console.log('Error opening database: ', err.message);
}

function openCB() {
  console.log('Database OPENED');
}

var db = SQLite.openDatabase({name: 'mcube.db'}, openCB, dbOpenErrorCB);

function closeDb() {
  SQLite.closeDatabase({name: 'mcube.db'});
}

module.exports = {
  db,
  closeDb
};
