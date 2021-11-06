'use strict';

const bottle = require('bottlejs').pop('app');
const models = require('./models');

bottle.service('PingService', function () {
    return new (require('./services/PingService'))(models.Ping)
});

bottle.service('NoteService', function () {
    return (require('./services/NoteService'))
});

bottle.service('NoteRepository', function () {
    return new (require('./repositories/NoteRepository'))(models.Note)
})



module.exports = bottle