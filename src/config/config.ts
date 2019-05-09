interface ConfigInterface {
  apiUrl: string;
}

// 开发
const development: ConfigInterface = {
  apiUrl: '',
}

// 预生产
const pre_production: ConfigInterface = {
  apiUrl: '',
}


// 生产
const production: ConfigInterface = {
  apiUrl: '',
}

export default (): ConfigInterface => {
  const currentEnv = process.env.BUILD_TYPE || process.env.NODE_ENV;

  let config = {
    development,
    pre_production,
    production,
    dev_production: production,
  }[currentEnv || 'development'];


  return config;
}
