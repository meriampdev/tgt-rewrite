const options = {
    receive: function (data /* , result, e */) {
        camelizeColumnNames(data);
    }
};
function camelizeColumnNames(data) {
    var template = data[0];
    for (var prop in template) {
        var camel = humps.camelize(prop);
        if (!(camel in template)) {
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                d[camel] = d[prop];
                delete d[prop];
            }
        }
    }
}
const humps = require('humps');
const pgp = require("pg-promise")(options);

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}
//const db = pgp(`postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)
//module.exports = db

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
// This fix the WARNING: Creating a duplicate database object for the same connection.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = (globalSymbols.indexOf(DB_KEY) > -1);
if (!hasDb) {
    global[DB_KEY] = pgp(`postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
    get: function () {
        return global[DB_KEY];
    }
});
Object.freeze(singleton);

module.exports = singleton;
