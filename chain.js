import { fetchRawFileContents } from './util'
import { sourcePath } from './config'


class Chain{
  id = null
  name = null
  description = null
  isRelay = false
  links = {}
  assets = {}
  rpcs = []
  status = 'INITIALIZED'

  constructor(id){
    this.id = id
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
        get(target, key) {
          const filename = target?.assets[key]
          return !!filename ? `${sourcePath}${target.id}/assets/${filename}` : null
        }
      }
    )
  }
}

export default Chain