import * as vega from 'vega'
import * as vegalite from 'vega-lite'

const wrapInDiv = (svg: string) =>
  `<div class="chart">${svg}</div>`

export const renderVega = async (json: any) => {
  const view = new vega.View(vega.parse(json))
  return wrapInDiv(await view.toSVG())
}

export const renderVegalite = async (json: any) => {
  const { spec } = vegalite.compile(json)
  return wrapInDiv(await renderVega(spec))
}