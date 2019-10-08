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

  async predict() {
    await manager.train();
    manager.save();
    const response = await manager.process('pt', 'As bios possuem senha?');
    console.log(response);
  }
}

module.exports = new Nlp();
