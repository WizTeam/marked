const Lexer = require('../../src/Lexer.js');

function expectTokens({ md, options, tokens = [], links = {} }) {
  const lexer = new Lexer(options);
  const actual = lexer.lex(md);
  const expected = tokens;
  expected.links = links;
  // console.log(JSON.stringify(actual, null, 2));
  expect(actual).toEqual(expected);
}

function expectInlineTokens({ md, options, tokens = jasmine.any(Array), links = {} }) {
  const lexer = new Lexer(options);
  lexer.tokens.links = links;
  const outTokens = [];
  lexer.inlineTokens(md, outTokens);
  expect(outTokens).toEqual(tokens);
}

function expectInline({ token, options, tokens }) {
  const lexer = new Lexer(options);
  lexer.inline([token]);
  expect(token.tokens).toEqual(tokens);
}

describe('Lexer', () => {

  describe('wiz-list', () => {
    it('listInLine 01', () => {
      expectTokens({
        md: `
1. 1. 1. 1. abc
`,
        tokens: [
          {
            "type": "list",
            "raw": "1. 1. 1. 1. abc\n",
            "ordered": true,
            "start": 1,
            "loose": false,
            "items": [
              {
                "type": "list_item",
                "raw": "1. 1. 1. 1. abc\n",
                "task": false,
                "loose": false,
                "checked": undefined,
                "spaceCount": 3,
                "text": "1. 1. 1. abc\n",
                "tokens": [
                  {
                    "type": "list",
                    "raw": "1. 1. 1. abc\n",
                    "ordered": true,
                    "start": 1,
                    "loose": false,
                    "items": [
                      {
                        "type": "list_item",
                        "raw": "1. 1. 1. abc\n",
                        "task": false,
                        "loose": false,
                        "checked": undefined,
                        "spaceCount": 3,
                        "text": "1. 1. abc\n",
                        "tokens": [
                          {
                            "type": "list",
                            "raw": "1. 1. abc\n",
                            "ordered": true,
                            "start": 1,
                            "loose": false,
                            "items": [
                              {
                                "type": "list_item",
                                "raw": "1. 1. abc\n",
                                "task": false,
                                "loose": false,
                                "checked": undefined,
                                "spaceCount": 3,
                                "text": "1. abc\n",
                                "tokens": [
                                  {
                                    "type": "list",
                                    "raw": "1. abc\n",
                                    "ordered": true,
                                    "start": 1,
                                    "loose": false,
                                    "items": [
                                      {
                                        "type": "list_item",
                                        "raw": "1. abc\n",
                                        "task": false,
                                        "loose": false,
                                        "checked": undefined,
                                        "spaceCount": 3,
                                        "text": "abc\n",
                                        "tokens": [
                                          {
                                            "type": "text",
                                            "raw": "abc",
                                            "text": "abc",
                                            "tokens": [
                                              {
                                                "type": "text",
                                                "raw": "abc",
                                                "text": "abc"
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  
    it('listInLine 02', () => {
      expectTokens({
        md: `
1. 1. 1. 1. 
`,
        tokens: [
          {
            "type": "list",
            "raw": "1. 1. 1. 1. \n",
            "ordered": true,
            "start": 1,
            "loose": false,
            "items": [
              {
                "type": "list_item",
                "raw": "1. 1. 1. 1. \n",
                "task": false,
                "loose": false,
                "checked": undefined,
                "spaceCount": 3,
                "text": "1. 1. 1. \n",
                "tokens": [
                  {
                    "type": "list",
                    "raw": "1. 1. 1. \n",
                    "ordered": true,
                    "start": 1,
                    "loose": false,
                    "items": [
                      {
                        "type": "list_item",
                        "raw": "1. 1. 1. \n",
                        "task": false,
                        "loose": false,
                        "checked": undefined,
                        "spaceCount": 3,
                        "text": "1. 1. \n",
                        "tokens": [
                          {
                            "type": "list",
                            "raw": "1. 1. \n",
                            "ordered": true,
                            "start": 1,
                            "loose": false,
                            "items": [
                              {
                                "type": "list_item",
                                "raw": "1. 1. \n",
                                "task": false,
                                "loose": false,
                                "checked": undefined,
                                "spaceCount": 3,
                                "text": "1. \n",
                                "tokens": [
                                  {
                                    "type": "list",
                                    "raw": "1. \n",
                                    "ordered": true,
                                    "start": 1,
                                    "loose": false,
                                    "items": [
                                      {
                                        "type": "list_item",
                                        "raw": "1. \n",
                                        "task": false,
                                        "loose": false,
                                        "checked": undefined,
                                        "spaceCount": 3,
                                        "text": "\n",
                                        "tokens": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });

    it('listInLine 03', () => {
      expectTokens({
        md: `
1. 1. 1. 1.
`,
        tokens: [
          {
            "type": "list",
            "raw": "1. 1. 1. 1.\n",
            "ordered": true,
            "start": 1,
            "loose": false,
            "items": [
              {
                "type": "list_item",
                "raw": "1. 1. 1. 1.\n",
                "task": false,
                "loose": false,
                "checked": undefined,
                "spaceCount": 3,
                "text": "1. 1. 1.\n",
                "tokens": [
                  {
                    "type": "list",
                    "raw": "1. 1. 1.\n",
                    "ordered": true,
                    "start": 1,
                    "loose": false,
                    "items": [
                      {
                        "type": "list_item",
                        "raw": "1. 1. 1.\n",
                        "task": false,
                        "loose": false,
                        "checked": undefined,
                        "spaceCount": 3,
                        "text": "1. 1.\n",
                        "tokens": [
                          {
                            "type": "list",
                            "raw": "1. 1.\n",
                            "ordered": true,
                            "start": 1,
                            "loose": false,
                            "items": [
                              {
                                "type": "list_item",
                                "raw": "1. 1.\n",
                                "task": false,
                                "loose": false,
                                "checked": undefined,
                                "spaceCount": 3,
                                "text": "1.\n",
                                "tokens": [
                                  {
                                    "type": "text",
                                    "raw": "1.",
                                    "text": "1.",
                                    "tokens": [
                                      {
                                        "type": "text",
                                        "raw": "1.",
                                        "text": "1."                                        
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  
    it('list with blank lines', () => {
      expectTokens({
        md: `
1. aaa

   

   

1. bbb
`,
        tokens: [
          {
            "type": "list",
            "raw": "1. aaa\n\n   \n\n   \n\n1. bbb\n",
            "ordered": true,
            "start": 1,
            "loose": true,
            "items": [
              {
                "type": "list_item",
                "raw": "1. aaa\n\n   \n\n   \n",
                "task": false,
                "loose": true,
                "checked": undefined,
                "spaceCount": 3,
                "text": "aaa\n\n\n\n\n",
                "tokens": [
                  {
                    "type": "text",
                    "raw": "aaa",
                    "text": "aaa",
                    "tokens": [
                      {
                        "type": "text",
                        "raw": "aaa",
                        "text": "aaa"
                      }
                    ]
                  },
                  {
                    "type": "space",
                    "raw": "\n\n\n\n\n"
                  }
                ]
              },
              {
                "type": "list_item",
                "raw": "1. bbb\n",
                "task": false,
                "loose": true,
                "checked": undefined,
                "spaceCount": 3,
                "text": "bbb\n",
                "tokens": [
                  {
                    "type": "text",
                    "raw": "bbb",
                    "text": "bbb",
                    "tokens": [
                      {
                        "type": "text",
                        "raw": "bbb",
                        "text": "bbb"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  
  
    it('list with blank lines 02', () => {
      expectTokens({
        md: `
1. aaa





1. bbb
`,
        tokens: [
          {
            "type": "list",
            "raw": "1. aaa\n\n\n\n\n\n",
            "ordered": true,
            "start": 1,
            "loose": false,
            "items": [
              {
                "type": "list_item",
                "raw": "1. aaa\n\n\n\n\n\n",
                "task": false,
                "loose": false,
                "checked": undefined,
                "spaceCount": 3,
                "text": "aaa\n\n\n\n\n\n",
                "tokens": [
                  {
                    "type": "text",
                    "raw": "aaa",
                    "text": "aaa",
                    "tokens": [
                      {
                        "type": "text",
                        "raw": "aaa",
                        "text": "aaa"
                      }
                    ]
                  },
                  {
                    "type": "space",
                    "raw": "\n\n\n\n\n\n"
                  }
                ]
              }
            ]
          },
          {
            "type": "list",
            "raw": "1. bbb\n",
            "ordered": true,
            "start": 1,
            "loose": false,
            "items": [
              {
                "type": "list_item",
                "raw": "1. bbb\n",
                "task": false,
                "loose": false,
                "checked": undefined,
                "spaceCount": 3,
                "text": "bbb\n",
                "tokens": [
                  {
                    "type": "text",
                    "raw": "bbb",
                    "text": "bbb",
                    "tokens": [
                      {
                        "type": "text",
                        "raw": "bbb",
                        "text": "bbb"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  
  
    it('list with blank lines 03', () => {
      expectTokens({
        md: `
1. aaa

xxx

   

1. bbb
`,
        tokens: [
          {
            "type": "list",
            "raw": "1. aaa\n\n",
            "ordered": true,
            "start": 1,
            "loose": false,
            "items": [
              {
                "type": "list_item",
                "raw": "1. aaa\n\n",
                "task": false,
                "loose": false,
                "checked": undefined,
                "spaceCount": 3,
                "text": "aaa\n\n",
                "tokens": [
                  {
                    "type": "text",
                    "raw": "aaa",
                    "text": "aaa",
                    "tokens": [
                      {
                        "type": "text",
                        "raw": "aaa",
                        "text": "aaa"
                      }
                    ]
                  },
                  {
                    "type": "space",
                    "raw": "\n\n"
                  }
                ]
              }
            ]
          },
          {
            "type": "paragraph",
            "raw": "xxx",
            "text": "xxx",
            "tokens": [
              {
                "type": "text",
                "raw": "xxx",
                "text": "xxx"
              }
            ]
          },
          {
            "type": "space",
            "raw": "\n\n"
          },
          {
            "type": "paragraph",
            "raw": "   ",
            "text": "   ",
            "tokens": [
              {
                "type": "text",
                "raw": "   ",
                "text": "   "
              }
            ]
          },
          {
            "type": "space",
            "raw": "\n\n"
          },
          {
            "type": "list",
            "raw": "1. bbb\n",
            "ordered": true,
            "start": 1,
            "loose": false,
            "items": [
              {
                "type": "list_item",
                "raw": "1. bbb\n",
                "task": false,
                "loose": false,
                "checked": undefined,
                "spaceCount": 3,
                "text": "bbb\n",
                "tokens": [
                  {
                    "type": "text",
                    "raw": "bbb",
                    "text": "bbb",
                    "tokens": [
                      {
                        "type": "text",
                        "raw": "bbb",
                        "text": "bbb"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  
  });
});
