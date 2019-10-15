require('dotenv').config();
const File = require('./Classes/File');
const Nlp = require('./Classes/Nlp');

File.getCsvData(`${__dirname}/dataset_assessments.csv`, (lines) => {
  Nlp.addToDocument(lines);
  File.getCsvData(`${__dirname}/Csvs/${process.env.CSV_NAME}`, async (linesToPredict) => {
    const headers = Object.keys(linesToPredict[0]);
    const response = await Nlp.predict(linesToPredict, headers);
    File.writeToCsv(headers, response);
  });
  // Nlp.groupLinesInArray(lines);
});
