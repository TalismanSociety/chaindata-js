import { get } from 'lodash'
import Chain from './chain'
import { fetchRawFileContents } from './util'

let CHAINS: object = {}
let CACHED_CHAIN_SPECS: any = {}

let Chains = () => {

  // fetch the chain manifest
  let all = async () => new Promise(async (resolve, reject) => {
    try {
      if(!Object.entries(CHAINS).length) CHAINS = await fetchRawFileContents(`manifest.json`)
      resolve(CHAINS)
    } catch(e) {
      reject(e);
    }
  })

  // get a chain by ID
  let chainById = async (id: number|string, field: string|array|null)  => {

    id = id.toString()

    // get supported chain manifest
    const chainManifest = await all()

    // get all available chain IDs
    const chainIds: string[] = Object.keys(chainManifest)

    // make sure we support the chain
    if(!chainIds.includes(id)) throw new Error('Chain not supported')

    // check if we have the spec for the chain already cached locally
    let _chain = CACHED_CHAIN_SPECS[id]

    // if not, go initialize it
    if(!_chain) {
      _chain = new Chain(id)
      await _chain.init()
      CACHED_CHAIN_SPECS[id] = _chain
    }

    if(!field){
      return _chain
    }else{
      // make array to iterate
      const fields = typeof field === 'string' ? [field] : field
      const values = {}

      fields.forEach(key => {
        values[key] = get(_chain, field)
      })

      return values
    }
  }

  return {
    all,
    chainById
  }
}

export default Chains