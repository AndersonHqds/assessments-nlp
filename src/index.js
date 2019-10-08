const File = require('./Classes/File');
const Nlp = require('./Classes/Nlp');

File.getCsvData(`${__dirname}/dataset_assessments.csv`, (lines) => {
  Nlp.addToDocument(lines);
  Nlp.predict();
});
