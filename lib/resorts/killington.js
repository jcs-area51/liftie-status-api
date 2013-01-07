var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');

function parse(dom) {
  var liftStatus = {};

  // add parsing code here
  select(dom, '#lift_report-page td.lift').forEach(function(node) {
    var nameNode = node.next,
      name = nameNode.children[0].data.trim(),
      status = nameNode.next.children[0].attribs.src;
    liftStatus[name] = coerce(status, status.lastIndexOf('/') + 1, -4);
  });

  return liftStatus;
}

module.exports = {
  name: 'Killington',
  url: {
    host: 'http://www.killington.com',
    pathname: '/winter/mountain/conditions/lifts'
  },
  tags: ['New England', 'Vermont'],
  parse: parse
};