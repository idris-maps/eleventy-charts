import { TextData } from '../parseTextBlock'
import { renderVegalite } from './vega'

interface Config {
  width: string
  height: string
  color: string
  temporal?: boolean
  [key: string]: any
}

const defaultConfig: Config = {
  width: '400',
  height: '200',
  color: 'steelblue',
}

export default async ({ config, data, head }: TextData) => {
  const lineConfig = { ...defaultConfig, ...config }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": lineConfig.width,
    "height": lineConfig.height,
    "data": {
      "values": data,
    },
    "mark": "area",
    "encoding": {
      "x": {"field": head[0], "type": lineConfig.temporal ? "temporal" : "ordinal" },
      "y": {"field": head[1], "type": "quantitative"},
      "color": { "value": lineConfig.color }
    }
  }
  return await renderVegalite(spec)
}