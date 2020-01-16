module.exports = {
    // 源码目录
    srcPath: 'src',
    // 脚本目录
    scriptPath: 'scripts',
    // 入口文件
    index: 'src/index.js',
    // 页面模板
    template: 'src/index.html',
    // 编译目录
    buildPath: '/dist',
    // 资源目录
    publicPath: ['public', 'dist'],
    // 开发域名
    devHost: 'localhost',
    // 资源包名
    bundleName: "nealPage",
    // 调试标记
    debugBundleMark: 'min',
    // 资源发布地址
    assetsPath: {
        images: null,    // 图片cdn地址
        fonts: null,     // 字体文件cdn地址
        other: null,    // 除图片和字体文件外其他媒体文件cdn地址
        unitive: null   // 统一所有文件的cdn地址,备用fallback
    },
    // 开发端口
    devPort: "3000",
    publishPath: {
        // master: 'https://shark2.douyucdn.cn/front-publish',
        // live: 'https://sta-op-test.douyucdn.cn/front-publish',
        // trunk: 'https://sta-op-test.douyucdn.cn/front-publish',
        // develop: 'https://sta-op-test.douyucdn.cn/front-publish'
    }
};