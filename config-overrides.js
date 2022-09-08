const px2viewport = require('postcss-px-to-viewport')
const path = require('path')
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addPostcssPlugins,
} = require('customize-cra')

const babelPlugins = fixBabelImports('import', {
  libraryName: 'antd-mobile',
  style: 'css',
})

const webpackAlias = addWebpackAlias({
  '@': path.join(__dirname, 'src'),
  '@scss': path.join(__dirname, 'src', 'assets', 'styles'),
})

const postcssPlugins = addPostcssPlugins([
  // 移动端布局 viewport 适配方案
  px2viewport({
    // 视口宽度：可以设置为设计稿的宽度
    unitToConvert: 'px',
    viewportWidth: 375,
    unitPrecision: 5,
    propList: ['*'],
    viewportUnit: 'vw',
    fontViewportUnit: 'vw',
    selectorBlackList: [],
    minPixelValue: 1,
    mediaQuery: false,
    replace: true,
    exclude: undefined,
    include: undefined,
    landscape: false,
    landscapeUnit: 'vw',
    landscapeWidth: 568,
    // 白名单：不需对其中的 px 单位转成 vw 的样式类类名
    // selectorBlackList: ['.ignore', '.hairlines'],
  }),
])

// 导出要进行覆盖的 webpack 配置
module.exports = override(babelPlugins, postcssPlugins, webpackAlias)
