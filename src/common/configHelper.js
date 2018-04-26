const productionConfig = require('../../config/production/env_production.json')

class ConfigurationHelper {
  constructor(env) {
    if (env === 'development') {
      this.env = productionConfig;
    } else if (env === 'production') {
      this.env = productionConfig;
    }
  }
}

export default new ConfigurationHelper(process.env.ELECTRON_WEBPACK_APP_ENVIRONMENT);
