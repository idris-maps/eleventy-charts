import { pipe, trim } from 'ramda'

const replace = (toRemove: string, toAdd: string) =>
  (string: string) =>
    string.split(toRemove).join(toAdd)

export default (lines: string[]) =>
  JSON.parse(
    lines
      .map(pipe(trim, replace('&quot;', '"')))
      .join('')
  )