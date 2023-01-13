const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  mode: 'development',
  devtools: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "./dist"),
    // 必须指定产物完整路径
    publicPath: 'http://localhost:8080/dist/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './utils': './src/utils',
        './foo': './src/foo'
      },
      // 共享模块，如果版本不一致，还是会多次加载，
      // 可以通过 shared.[lib].requiredVersion 配置项显式声明应用需要的依赖库版本来解决这个问题：
      // shared: ['lodash'],
      shared: {
        lodash: {
          requiredVersion: '^x.x.x',
          // 控制依赖的共享范围
          shareScope: 'foo'
        }
      },
      devServer: {
        port: 8080,
        hot: true,
      },
    })
  ]

}