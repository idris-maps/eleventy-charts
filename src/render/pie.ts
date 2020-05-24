import { TextData } from '../parseTextBlock'
import { renderVegalite } from './vega'

interface Config {
  width: string
  height: string
  [key: string]: any
}

const defaultConfig: Config = {
  width: '400',
  height: '200',
}

export default async ({ config, data, head }: TextData) => {
  const pieConfig = { ...defaultConfig, ...config }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": pieConfig.width,
    "height": pieConfig.height,
    "data": {
      "values": data,
    },
    "mark": "arc",
    "encoding": {
      "theta": {"field": head[1], "type": "quantitative"},
      "color": {"field": head[0], "type": "nominal"}
    },
    "view": {"stroke": null}
  }
  return await renderVegalite(spec)
}
