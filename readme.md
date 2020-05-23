# eleventy-charts

An [`eleventy`](https://www.11ty.dev/) plugin to add charts

## Usage

```
npm install eleventy-charts --save-dev
```

In your `.eleventy.js`-file:

```js
const charts = require('eleventy-charts')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(charts)
}
```

In your markdown, use codeblocks with the `vega` or `vegalite` language:

```md
# My chart

\`\`\`vegalite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A simple bar chart with embedded data.",
  "width": 400,
  "height": 200,
  "padding": 5,
  "data": {
    "values": [
      {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
      {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
      {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal", "axis": {"labelAngle": 0}},
    "y": {"field": "b", "type": "quantitative"}
  }
}
\`\`\`
```