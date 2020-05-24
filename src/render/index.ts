import parseJSON from '../parseJsonBlock'
import parseText from '../parseTextBlock'
import { PartCode } from '../separateCodeblocks'
import { renderVega, renderVegalite } from './vega'
import renderUnknown from './unknown'
import renderBar from './bar'
import renderLine from './line'

export const lang = {
  'bar-chart': 'bar-chart',
  'line-chart': 'line-chart',
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

    if (language === lang['line-chart']) {
      return await renderLine(parseText(lines))
    }

    return renderUnknown(language, lines)

  } catch (e) {
    return renderUnknown(language, lines)
  }
}