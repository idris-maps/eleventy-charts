import parseJSON from '../parseJsonBlock'
import parseText from '../parseTextBlock'
import { PartCode } from '../separateCodeblocks'
import { renderVega, renderVegalite } from './vega'
import renderUnknown from './unknown'
import renderBar from './bar'
import renderLine from './line'
import renderPie from './pie'
import renderArea from './area'
import renderMultiline from './multiline'

export const lang = {
  'area-chart': 'area-chart',
  'bar-chart': 'bar-chart',
  'line-chart': 'line-chart',
  'multiline-chart': 'multiline-chart',
  'pie-chart': 'pie-chart',
  'vega-lite': 'vega-lite',
  vega: 'vega',
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

    if (language === lang['line-chart']) {
      return await renderLine(parseText(lines))
    }

    if (language === lang['area-chart']) {
      return await renderArea(parseText(lines))
    }

    if (language === lang['pie-chart']) {
      return await renderPie(parseText(lines))
    }

    if (language === lang['multiline-chart']) {
      return await renderMultiline(parseText(lines))
    }

    return renderUnknown(language, lines)

  } catch (e) {
    return renderUnknown(language, lines)
  }
}