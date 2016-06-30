import loopback from 'loopback';
import boot from 'loopback-boot';

import https from 'https';
import http from 'http';
import { privateKey, certificate } from './ssl-config';
import { getLogger } from './boot/logger';

const app = module.exports = loopback();

app.start = (httpON) => {
  let httpOnly = httpON;

  if (httpOnly === undefined) {
    if (process.env.HTTP_ONLY === undefined) {
      httpOnly = true;
    } else {
      httpOnly = !(process.env.HTTP_ONLY === 'false');
    }
  }

  let server = null;

  if (!httpOnly) {
    server = https.createServer({
      key: privateKey,
      cert: certificate },
    app);
  } else {
    server = http.createServer(app);
  }


  server.listen(app.get('port'), () => {
    const baseUrl = `${(httpOnly ? 'http://' : 'https://')}${app.get('host')}:${app.get('port')}`;
    app.emit('started', baseUrl);
    getLogger().info('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      getLogger().info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });

  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
