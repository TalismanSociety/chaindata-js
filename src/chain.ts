import { sourcePath } from './config'
import { fetchRawFileContents } from './util'

export type Status = 'INITIALIZED' | 'HYDRATING' | 'READY'

export default class Chain {
  id: string
  name: string | null = null
  description: string | null = null
  nativeToken: string | null = null
  tokenDecimals: number | null = null
  isRelay: boolean = false
  links: { [key: string]: string } = {}
  assets: { [key: string]: string } = {}
  rpcs: string[] = []
  status: Status = 'INITIALIZED'

  constructor(id: string) {
    this.id = id
  }

  async init() {
    this.status = 'HYDRATING'
    const manifestPath = `${chaindirpath(this.id)}/manifest.json`
    const manifest = await fetchRawFileContents(manifestPath)

    Object.keys(manifest).forEach(key => {
      this[key] = manifest[key]
    })

    this.links = manifest.links || {}
    this.assets = manifest.assets || {}
    this.rpcs = manifest.rpcs || []

    this.status = 'READY'
  }

  get asset() {
    return new Proxy(this, {
      get: function (target: Chain, key: string) {
        const filename = target && target.assets[key]
        return filename ? `${sourcePath}${chaindirpath(target.id)}/assets/${filename}` : null
      },
    })
  }
}

const chaindirpath = (id: string): string =>
  id
    .split('-')
    .map((idPart, index) => (index === 0 ? idPart : `parathreads/${idPart}`))
    .join('/')
