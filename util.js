import { sourcePath } from './config'

export const fetchRawFileContents = async (path: string) => {
  return await fetch(`${sourcePath}${path}`).then(async r => {
    try {
      const result = await r.text()
      return JSON.parse(result.replace(/,(?!\s*?[{["'\w])/g, ''))
    } catch(e) {
      // statements
      console.log(e);
    }
  })
}