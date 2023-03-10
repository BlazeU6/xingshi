const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  productionSourceMap:false,
  publicPath:'./',
  devServer:{
    open:true,
    host:"localhost",
    port:8080,
    
    //配置webpack代理来解决跨域问题
    proxy:{
      "/api":{
        target:"http://gmall-h5-api.atguigu.cn",
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },

})
