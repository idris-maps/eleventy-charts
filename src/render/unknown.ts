import { startLine, endLine } from '../separateCodeblocks'

export default (language: string, lines: string[]) =>
  [
    startLine(language),
    ...lines,
    endLine,
  ].join('\n')