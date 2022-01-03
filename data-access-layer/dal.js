const mongoose = require("mongoose");

function connectAsync() {
    return new Promise((resolve, reject) => {
        // const connStr = config.mongodb.connectionString;
        const connStr = config.mongodb.connectionString;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }; // useNewUrlParser: use the new url parser (old one is deprecated), useUnifiedTopology: use the new topology engine for handling the different parts of MongoDB (topology = the way in which the inner parts are interrelated or arranged).
        mongoose.connect(connStr, options, (err, db) => {
            if (err) {
                global.config.err = err;
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}
// Connect to the database:
(async () => {
    try {
        const db = await connectAsync();
        console.log(
            `We're connected to ${db.connections[0].name} database on MongoDB`
        );
    } catch (err) {
        console.error(err);
    }
})();
