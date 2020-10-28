const { arrayReplaceAt } = require('markdown-it/lib/common/utils');
const marked = require('../');
const Lexer = require('../src/Lexer');

// const blocks = [{
//   blockId: '1',
//   text: 'Marked - Markdown Parser'
// }, {
//   blockId: '2',
//   text: 'test [wiz.cn](http://www.wiz.cn)'
// }, {
//   blockId: '3',
//   text: ''
// }, {
//   blockId: '4',
//   text: '[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.'
// }, {
//   blockId: '41',
//   text: ''
// }, {
//   blockId: '5',
//   text: 'How To Use The Demo'
// }, {
//   blockId: '6',
//   text: ''
// }, {
//   blockId: '7',
//   text: '1. Type in stuff on the left.\n  test memo'
//   // text: '1. Type in stuff on the left.'
// }, {
//   blockId: '7.1',
//   text: '  11. test sub list1.'
// }, {
//   blockId: '7.2',
//   text: '  11. test sub list1.'
// }, {
//   blockId: '7.3',
//   text: '  11. test sub list1.'
// }, {
//   blockId: '7.3',
//   text: ''
// }, {
//   blockId: '8',
//   text: '2. See the live updates on the right.'
// }, {
//   blockId: '9',
//   text: ''
// }, {
//   blockId: '10',
//   text: '## sub heading'
// }, {
//   blockId: '11',
//   text: ''
// }, {
//   blockId: '12',
//   text: 'normal text'
// }, {
//   blockId: '13',
//   text: ''
// }, {
//   blockId: '14',
//   text: '```js\nvar i = 0;\n```'
// }, {
//   blockId: '15',
//   text: ''
// }];
// const blocks = [
// {
//   blockId: '1',
//   text: '1. 有序列表 01 [abc](aaaa)'
// }, {
//   blockId: '2',
//   text: '  5555555'
// }, {
//   blockId: '21',
//   text: ''
// }, {
//   blockId: '3',
//   text: '  1. 有序列表 02'
// }, {
//   blockId: '4',
//   text: '1. 有序列表 03'
// }, {
//   blockId: '5',
//   text: ''
// }, {
//   blockId: '6',
//   text: '啊啊啊啊啊啊啊'
// }, {
//   blockId: '7',
//   text: '灌灌灌灌灌灌灌'
// }];

// const markdown = blocks.map((block) => block.text).join('\n');

// const markdown = `
// 1. 有序列表 01 [abc](aaaa)

// 啊啊啊啊啊






//   1. 有序列表 02
//   1. 有序列表 03






// 1. 有序列表 04
//   1. 有序列表 05
// `;
const markdown = `
1. aaa

xxx

   

1. bbb
`;
console.log(markdown);
const tokens = marked.lexer(markdown);
console.log(tokens.length);
console.log(JSON.stringify(tokens, null, 2));
return;

function addLevelToTokens(tokens, level) {
  for (const token of tokens) {
    if (token.type === 'list') {
      let start = token.start || 1;
      token.items.forEach((token) => {
        token.number = start;
        start++;
        token.level = level;
        const subTokens = token.tokens;
        addLevelToTokens(subTokens, level + 1);
      });
    }
  }
}

addLevelToTokens(tokens, 0);

function findListBlock(block, blockToken, items) {
  for (const item of items) {
    if (item.type === 'list_item') {
      if (item.raw.trim().startsWith(blockToken.raw.trim())) {
        if (!item.used) {
          item.used = true;
          block.token = item;
          return true;
        }
      }
    }
    //
    if (item.tokens) {
      const tokens = item.tokens;
      for (const token of tokens) {
        if (token.type === 'list') {
          if (findListBlock(block, blockToken, token.items)) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
//
function isListUsed(items) {
  for (const item of items) {
    if (item.type === 'list_item') {
      if (!item.used) {
        return false;
      }
    }
    //
    if (item.tokens) {
      const tokens = item.tokens;
      for (const token of tokens) {
        if (token.type === 'list') {
          if (!isListUsed(token.items)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
//

let nextTokenPos = 0;
//
blocks.forEach((block) => {
  //
  const nextToken = tokens[nextTokenPos];
  if (!nextToken) {
    return;
  }
  if (!block.text) {
    if (nextToken.type === 'space') {
      block.token = nextToken;
      nextTokenPos++;
    }
    return;
  }
  //
  const lexer = new Lexer();
  const blockTokens = [];
  lexer.blockTokens(block.text.trim(), blockTokens);
  if (blockTokens.length === 1) {
    const blockToken = blockTokens[0];
    if (blockToken.type === nextToken.type) {
      if (blockToken.type === 'list') {
        //
        if (!findListBlock(block, blockToken, nextToken.items)) {
          console.error('failed to find list token');
        } else {
          if (isListUsed(nextToken.items)) {
            nextTokenPos++;
          }
        }
        //
      } else {
        if (nextToken.raw.startsWith(blockToken.raw)) {
          block.token = nextToken;
          nextTokenPos++;
        } else {
          console.error('not a sub string');
        }
      }
    } else {
      console.error(`invalid token type: ${blockToken.type}, ${nextToken.type}`);
    }
  } else {
    console.error(`invalid blockTokens: ${blockTokens}`);
  }
});
//
//
console.log(JSON.stringify(blocks, null, 2));
