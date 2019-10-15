const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['pt'] });
const QUESTIONS = 0;
const RESPONSES = 1;
const CATEGORIES = 2;

class Nlp {
  addToDocument(lines) {
    const keys = Object.keys(lines[0]);
    lines.forEach((line) => {
      const question = line[keys[QUESTIONS]];
      const response = {
        response: line[keys[RESPONSES]],
        category: line[keys[CATEGORIES]],
      };
      const responseTag = response.response.toLowerCase().replace(/\s/gmi, '');

      manager.addDocument('pt', question, `response.${responseTag}`);

      manager.addAnswer('pt', `response.${responseTag}`, response);
    });
  }

  groupLinesInArray(lines) {
    console.log(lines);
  }

  async predict(lines, headers) {
    await manager.train();
    manager.save();
    if (!headers[process.env.ANSWER_COLUMN]) {
      headers[process.env.ANSWER_COLUMN] = 'Respostas';
    }

    let response = lines.map(async (line) => (
      {
        ...line,
        [headers[process.env.ANSWER_COLUMN]]: ((await manager
          .process('pt', line[headers[process.env.QUESTION_COLUMN]])).answer)
          ? (await manager.process('pt', line[headers[process.env.QUESTION_COLUMN]])).answer.response
          : 'Sem Resposta',
      }
    ));
    response = await Promise.all(response);
    return response;
  }
}

module.exports = new Nlp();
