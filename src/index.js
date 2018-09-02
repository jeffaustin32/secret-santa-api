const config = require('./config/config');
const server = require('./server');

// Start our Express server
server.listen(config.PORT, (err) => {
    if (err) throw err;
    console.log(`Secret Santa is live on PORT ${config.PORT}`);
});