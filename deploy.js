const ghpages = require('gh-pages');

ghpages.publish('build', {
  branch: 'prod_build',
});
