const fs = require('node:fs');
const { v4: uuidv4 } = require('uuid');

const getId = () => {
  return uuidv4();
};

const writeJSONFunction = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) console.log(err);
    console.log(`changes saved to ${filename}`);
  });
};

module.exports = {
  getId,
  writeJSONFunction,
};
