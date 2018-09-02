const config = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3200,
    DATABASE_URI: process.env.DATABASE_URI || 'postgres://',
    SALT_ROUNDS: 10,
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'token_secret'
}

module.exports = config;