const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

class File {
  getCsvData(file, cb) {
    const lines = [];
    fs.createReadStream(file)
      .pipe(csvParser())
      .on('data', (row) => {
        lines.push(row);
      })
      .on('end', () => cb(lines));
  }

  async writeToCsv(headers, values) {
    headers = headers.map((header) => ({
      id: header,
      title: header,
    }));
    console.log(headers);
    const csvWriter = createCsvWriter({
      path: `./${process.env.CSV_NAME}`,
      header: headers,
    });

    const data = values;

    console.log(csvWriter.writeRecords(data));
  }
}

module.exports = new File();
