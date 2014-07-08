var falafel = require('falafel'),
    fs = require('fs');

exports.stripNodes = function(nodeName, file, dest) {
  "use strict";

  var nameSplit = nodeName.split('.'),
      target = {
        object : nameSplit[0],
        property : nameSplit[1]
      };

  var existsSync = fs.existsSync || require('path').existsSync;

  var src = existsSync(file) ? fs.readFileSync(file) : file;

  var output = falafel(src, function(node){
    if (node.type !== 'CallExpression') return;

    var nodeObj = node.callee.object && node.callee.object.name,
        nodeProp = node.callee.property && node.callee.property.name;

    if (
        nodeObj === target.object &&
        (!target.property || nodeProp === target.property)
      ) {
      node.update('0');
    }
  });

  if (dest) {
    return fs.writeFileSync(dest, output);
  } else {
    return output.toString();
  }
};

