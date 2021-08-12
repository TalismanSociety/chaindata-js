import { fetchRawFileContents } from './util'
import { sourcePath } from './config'

class Chain{
  constructor(id){
    this.id = id
    this.name = null
    this.description = null
    this.nativeToken = null
    this.isRelay = false
    this.links = {}
    this.assets = {}
    this.rpcs = []
    this.status = 'INITIALIZED'
  }

  async init(){
    this.status = 'HYDRATING'
    const manifest = await fetchRawFileContents(`${this.id}/manifest.json`)

    this.assets = manifest.assets||{}
    this.rpcs = manifest.rpcs||[]

    Object.keys(manifest).forEach( key => {
      this[key] = manifest[key]
    });
    
    this.status = 'READY'
  }

  get asset(){
    return new Proxy(this, 
      {
        get: function(target, key) {
          const filename = target && target.assets[key]
          return !!filename ? `${sourcePath}${target.id}/assets/${filename}` : null
        }
      }
    )
  }
}

export default Chain
