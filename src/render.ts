import * as vega from 'vega'
import * as vegalite from 'vega-lite'
import parseJSON from './parseJsonBlock'
import parseText, { TextData } from './parseTextBlock'
import { PartCode, startLine, endLine } from './separateCodeblocks'

const wrapInDiv = (svg: string) =>
  `<div class="chart">${svg}</div>`

const renderVega = async (json: any) => {
  const view = new vega.View(vega.parse(json))
  return wrapInDiv(await view.toSVG())
}

const renderVegalite = async (json: any) => {
  const { spec } = vegalite.compile(json)
  return wrapInDiv(await renderVega(spec))
}

interface BarConfig {
  width: string
  height: string
  color: string
  [key: string]: any
}

const defaultBarConfig: BarConfig = {
  width: '400',
  height: '200',
  color: 'steelblue',
}

const renderBar = async ({ config, data, head }: TextData) => {
  const barConfig = { ...defaultBarConfig, ...config }
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": barConfig.width,
    "height": barConfig.height,
    "data": {
      "values": data,
    },
    "mark": "bar",
    "encoding": {
      "x": {"field": head[0], "type": "ordinal", "axis": {"labelAngle": 0}},
      "y": {"field": head[1], "type": "quantitative"},
      "color": { "value": barConfig.color }
    }
  }
  return await renderVegalite(spec)
}

const renderUnknown = (language: string, lines: string[]) =>
[
  startLine(language),
  ...lines,
  endLine,
].join('\n')

export const lang = {
  'bar-chart': 'bar-chart',
  vega: 'vega',
  'vega-lite': 'vega-lite',
  vegalite: 'vegalite',
}

export default async ({ language, lines }: PartCode): Promise<string> => {
  try {
    
    if (language === lang.vega) {
      return await renderVega(parseJSON(lines))
    }

    if (language === lang['vega-lite']) {
      return await renderVegalite(parseJSON(lines))
    }

    if (language === lang.vegalite) {
      return await renderVegalite(parseJSON(lines))
    }

    if (language === lang['bar-chart']) {
      return await renderBar(parseText(lines))
    }

    return renderUnknown(language, lines)

  } catch (e) {
    return renderUnknown(language, lines)
  }
}