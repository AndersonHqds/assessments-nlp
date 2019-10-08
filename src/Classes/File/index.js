const csv = require('csv-parser');
const fs = require('fs');

class File {
  async getCsvData(file, cb) {
    const lines = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => {
        lines.push(row);
      })
      .on('end', () => cb(lines));
  }
}

module.exports = new File();
