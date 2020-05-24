import { TextData } from '../parseTextBlock'
import { renderVegalite } from './vega'

interface Config {
  width: string
  height: string
  color: string
  [key: string]: any
}

const defaultConfig: Config = {
  width: '400',
  height: '200',
  color: 'steelblue',
}

export default async ({ config, data, head }: TextData) => {
  const barConfig = { ...defaultConfig, ...config }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": barConfig.width,
    "height": barConfig.height,
    "data": {
      "values": data,
    },
    "mark": "bar",
    "encoding": {
      "x": {"field": head[0], "type": "ordinal" },
      "y": {"field": head[1], "type": "quantitative"},
      "color": { "value": barConfig.color }
    }
  }
  return await renderVegalite(spec)
}