'use strict'

const SQLiteCrud = require('sqlite3-promisify')
const path = require('path');
const config = require('../config/config.json');

const dbName = process.env.NODE_ENV ? config.TEST.DB.NAME : config.DB.NAME;
const dbPath = path.join(__dirname, '../database', dbName);
const appDatabase = new SQLiteCrud(dbPath);

module.exports = appDatabase;