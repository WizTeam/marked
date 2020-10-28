
const marked = require('../');
const Lexer = require('../src/Lexer');

let markdown = '';
let tokens = null;

markdown = `
1. 111

1. 222

1. 333

   1. 3-1`;
tokens = marked.lexer(markdown);
console.log(JSON.stringify(tokens, null, 2));

// markdown = `
// 1. 456

// 1. 1. 1. a`;
// const tokens = marked.lexer(markdown);
// console.log(tokens.length);
// console.log(JSON.stringify(tokens, null, 2));
return;
