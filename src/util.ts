import { sourcePath } from './config'

export async function fetchRawFileContents(path: string) {
  const response = await fetch(`${sourcePath}${path}`)
  const result = await response.text()
  return JSON.parse(result.replace(/,(?!\s*?[{["'\w])/g, ''))
}
