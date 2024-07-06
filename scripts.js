const fs = require('fs');

const readString = fs.createReadStream('./docs/longText.txt', {encoding : 'utf-8'})

readString.on('data', (buffer) => {
    console.log('new buffer')
    console.log(buffer);
})