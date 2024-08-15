import crypto from 'crypto';

function generateRandomSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

const accessTokenSecret = generateRandomSecret();
const refreshTokenSecret = generateRandomSecret();

console.log('ACCESS_TOKEN_SECRET=' + accessTokenSecret);
console.log('ACCESS_TOKEN_EXPIRY=1d');
console.log('REFRESH_TOKEN_SECRET=' + refreshTokenSecret);
console.log('REFRESH_TOKEN_EXPIRY=10d');

/*
crypto is not an npm package. It is a built-in module in Node.js

crypto.randomBytes(length): Generates a buffer with random bytes. 
The length parameter specifies the number of bytes. Here, it defaults to 32 bytes.
.toString('hex'): Converts the buffer of random bytes into a hexadecimal string.
*/

