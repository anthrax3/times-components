const babylon = require('babylon')
const traverse = require('@babel/traverse').default
const path = require('path');

function breakpointSearch(node, breakpoint) {
  let styles = '';
  if(node.type === 'ObjectProperty' && node.key.type === "Identifier" && node.key.name === breakpoint) {
    if(node.value.body.type === 'TemplateLiteral'){
      node.value.body.quasis.map(element => styles = styles.concat(element.value.raw))
    }
  }
  return styles;
}

module.exports = function(options) {
  return {
    code: function(input, filepath) {
      let toReturn = '';
      if(input.includes("@times-components/responsive-styles")) {
        const ast = babylon.parse(input, {
          sourceType: 'module',
          plugins: [
            'jsx',
            'objectRestSpread',
            'decorators',
            'classProperties',
            'exportExtensions',
            'asyncGenerators',
            'functionBind',
            'functionSent',
            'dynamicImport',
            'optionalCatchBinding'
          ]
        });

        traverse(ast, {
          enter({ node }) {
            toReturn = toReturn.concat(breakpointSearch(node, "base"));
            toReturn = toReturn.concat(breakpointSearch(node, "smallUp"));
            toReturn = toReturn.concat(breakpointSearch(node, "mediumUp"));
            toReturn = toReturn.concat(breakpointSearch(node, "wideUp"));
            toReturn = toReturn.concat(breakpointSearch(node, "hugeUp"));
          }
        });
      }
      return toReturn;
    },
    result: function(stylelintResult, filepath) {
      // Ability to make desired fixes
      return null;
    }
  };
}
