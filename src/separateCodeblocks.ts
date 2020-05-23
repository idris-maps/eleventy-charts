import { startsWith, replace } from 'ramda'

export const startLine = (language: string) =>
  `<pre><code class="language-${language}">`

export const endLine = '</code></pre>'

export interface PartLine {
  type: 'line'
  line: string
}

export interface PartCode {
  type: 'code'
  language: string
  lines: string[]
}

export type Part = PartLine | PartCode 

export const isCodePart = (part: Part): part is PartCode =>
  part.type === 'code'

interface ReducerResult {
  parts: Part[]
  temp?: { language: string, lines: string[] }
}

const codeStartLanguage = (languages: string[], line: string) =>
  languages
    .find(language => line.includes(startLine(language)))

const isEndLine = (line: string) => startsWith(endLine, line)

const reducer = (languages: string[]) =>
  ({ parts, temp }: ReducerResult, line: string): ReducerResult => {
    const language = codeStartLanguage(languages, line)
  if (language) {
    return {
      parts,
      temp: { language, lines: [replace(startLine(language), '', line)] },
    }
  }
  if (isEndLine(line) && temp) {
    return {
      parts: [...parts, { type: 'code', ...temp }],
    }
  }
  if (temp) {
    return {
      parts,
      temp: { ...temp, lines: [...temp.lines, line] },
    }
  }
  return {
    parts: [...parts, { type: 'line', line }]
  }
}

export default (content: string, languages: string[]): Part[] => {
  const lines = content.split('\n')
  const { parts } = lines.reduce(reducer(languages), { parts: [] })
  return parts
}
