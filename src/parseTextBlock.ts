import frontmatter from 'front-matter'
import { trim, pipe } from 'ramda'
import { replace } from './parseJsonBlock'

const splitLine = (line: string) => line.split(',')

interface Config {
  [key: string]:  any
}

interface DataItem {
  [key: string]: string | number
}

export interface TextData {
  config: Config
  data: DataItem[]
  head: string[]
}

export default (lines: string[]): TextData => {
  const content = lines.map(trim).join('\n')
  const { attributes, body } = frontmatter<Config>(content)
  const [first, ...rest] = body.split('\n')
    .map(pipe(replace(' ', ','), replace('\n', ','), splitLine))
  const data: DataItem[] = rest.map(parts =>
    first
      .reduce((r, key, i) => ({
        ...r,
        [key || String(i)]: i === 0 ? parts[i] : Number(parts[i]),
      }), {})
  )
  return {
    config: attributes || {},
    data,
    head: first,
  }
}