'use strict';

const bottle = require('bottlejs').pop('app');
const models = require('./models');

bottle.service('PingService', function () {
    return new (require('./services/PingService'))(models.Ping)
});

bottle.service('NoteService', function () {
    return new (require('./services/NoteService'))(models.Note)
});

bottle.service('NoteRepository', function () {
    return new (require('./repositories/NoteRepository'))
})



module.exports = bottle