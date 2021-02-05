const fs = require('fs');

fs.writeFileSync(
  './build/env.js',
  `window.env = { SRCWEBAPI: '${process.env.SRCWEB}', LICENSEAPI: '${process.env.LICENSE}' }`
);
