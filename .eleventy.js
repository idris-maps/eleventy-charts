const charts = require('./dist').default

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform('eleventy-charts', charts)
}