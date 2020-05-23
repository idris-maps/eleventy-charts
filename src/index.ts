import getParts, { isCodePart, Part } from './separateCodeblocks'
import render, { lang } from './render'

const languages = Object.keys(lang)

const renderPart = async (part: Part): Promise<string> =>
  isCodePart(part) ? render(part) : part.line

export default async (content: string): Promise<string> => {
  const parts = getParts(content, languages)
  return (await Promise.all(parts.map(renderPart))).join('\n')
}