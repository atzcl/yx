/* eslint-disable */
const path = require('path');
/* eslint-end */

const resolve = (filePath) => path.resolve(__dirname, '..', filePath);

const cssLoaderOption = (url) => {
  const reg = /^@styles\/(.*)/

  return {
    file: reg.test(url) ? path.resolve(__dirname, '..', 'src/styles', url.match(reg)[1]) : url
  }
}

const config = {
  projectName: 's',
  date: '2019-2-28',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        ['env', {
          modules: false
        }]
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }
  },
  defineConstants: {
  },
  alias: {
    '@': resolve('src'),
    '@my_assets': resolve('src/assets'),
    '@my_components': resolve('src/components'),
    '@my_utils': resolve('src/utils'),
    '@my_services': resolve('src/services'),
    '@my_models': resolve('src/models'),
    '@my_pages': resolve('src/pages'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      esnextModules: [ 'taro-ui' ], // https://taro-ui.aotu.io/#/docs/questions
    },
    lessLoaderOption: {
      importer: cssLoaderOption
    }
  }
}

module.exports = function (merge) {
  // 环境变量
  const NODE_ENV = process.env.NODE_ENV;

  // 因为当前测试环境下的 api 地址分为 dev、uat、prod 三种，所以这里拓展了下对应的环境
  if ([ 'development', 'prep_production', 'production' ].includes(NODE_ENV)) {
    return merge(
      {},
      config,
      require('./dev'),
      // todo: 因为当前的需求很简单，只是为了获取不同的 env 类型, 后面如果还需要其他设置，那么就抽离为单独的文件引入吧
      { env: { NODE_ENV: NODE_ENV } }
    )
  }

  return merge({}, config, require('./prod'))
}
