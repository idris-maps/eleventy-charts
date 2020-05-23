import vega from 'vega'
import vegalite from 'vega-lite'
import parseJSON from './parseJsonBlock'
import { PartCode, startLine, endLine } from './separateCodeblocks'

const renderVega = async (json: any) => {
  const view = new vega.View(vega.parse(json))
  return await view.toSVG()
}

const renderVegalite = async (json: any) => {
  const { spec } = vegalite.compile(json)
  return await renderVega(spec)
}

const renderUnknown = (language: string, lines: string[]) =>
[
  startLine(language),
  ...lines,
  endLine,
].join('\n')

export const lang = {
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

    return renderUnknown(language, lines)

  } catch (e) {
    return renderUnknown(language, lines)
  }
}