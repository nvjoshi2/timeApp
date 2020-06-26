const crypto = require('crypto');

function hashPassword(password) {
    const salt = crypto.randomBytes(128).toString('hex')
    const itr = 10000;
    const hash = crypto.pbkdf2Sync(password, salt, itr, 64, 'sha512').toString('hex')

    return [
        hash,
        salt,
        itr,
    ]
}

function checkPassword(hash, salt, itr, password) {
    return hash == crypto.pbkdf2Sync(password, salt, itr, 64, 'sha512').toString('hex')
}

module.exports = {
    hashPassword,
    checkPassword
}