import { TextData } from '../parseTextBlock'
import { renderVegalite } from './vega'

interface Config {
  width: string
  height: string
  temporal?: boolean
  [key: string]: any
}

const defaultConfig: Config = {
  width: '400',
  height: '200',
}

export default async ({ config, data, head }: TextData) => {
  const multilineConfig = { ...defaultConfig, ...config }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": multilineConfig.width,
    "height": multilineConfig.height,
    "data": {
      "values": data,
    },
    "mark": "line",
    "encoding": {
      "x": {"field": head[0], "type": multilineConfig.temporal ? "temporal" : "ordinal" },
      "y": {"field": head[1], "type": "quantitative"},
      "color": {"field": head[2], "type": "nominal"}
    }
  }
  return await renderVegalite(spec)
}