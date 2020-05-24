import frontmatter from 'front-matter'
import { trim, pipe, propOr } from 'ramda'
import { dsvFormat } from 'd3-dsv'
import { replace } from './parseJsonBlock'

interface Config {
  [key: string]:  any
}

interface DataItem {
  [key: string]: string
}

export interface TextData {
  config: Config
  data: DataItem[]
  head: string[]
}

const splitLine = (line: string) =>
  line.split(',').map(trim)

export default (lines: string[]): TextData => {
  const content = lines.map(trim).join('\n')
  const { attributes, body } = frontmatter<Config>(content)
  const [first, ...rest] = body.split('\n')
    .map(splitLine)
  const data: DataItem[] = rest.map(parts =>
    first
      .reduce((r, key, i) => ({
        ...r,
        [key || String(i)]: parts[i],
      }), {})
  )
  return {
    config: attributes || {},
    data,
    head: first,
  }
}