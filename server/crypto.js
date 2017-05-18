const crypto = require('crypto');
require('dotenv').config();

console.log(process.env.SECRET1);
console.log(process.env.UPDATE);

const secret = process.env.SECRET;
const hash = crypto.createHmac('sha256', secret)
                   .update(process.env.UPDATE)
                   .digest('hex');
console.log(hash);