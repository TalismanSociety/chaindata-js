import { sourcePath } from './config'
import { fetchRawFileContents } from './util'

export type Status = 'INITIALIZED' | 'HYDRATING' | 'READY'

export default class Chain {
  id: string | number
  name: string | null = null
  description: string | null = null
  nativeToken: string | null = null
  isRelay: boolean = false
  links: { [key: string]: string } = {}
  assets: { [key: string]: string } = {}
  rpcs: string[] = []
  status: Status = 'INITIALIZED'

  constructor(id: string | number) {
    this.id = id
  }

  async init() {
    this.status = 'HYDRATING'
    const manifest = await fetchRawFileContents(`${this.id}/manifest.json`)

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
        return filename ? `${sourcePath}${target.id}/assets/${filename}` : null
      },
    })
  }
}
