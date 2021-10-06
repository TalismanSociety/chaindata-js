import { get } from 'lodash'

import Chain from './chain'
import { fetchRawFileContents } from './util'

type ChainsManifest = { [key: string]: string }

export default class Chains {
  names: ChainsManifest | null = null
  cachedChainSpecs: { [key: string]: Chain } = {}

  // fetch the chain manifest
  async all(): Promise<ChainsManifest> {
    if (this.names === null) this.names = await fetchRawFileContents(`manifest.json`)
    return this.names as ChainsManifest
  }

  // get a chain by ID
  async chainById(id: string | number, field?: string) {
    id = id.toString()

    // get supported chain manifest
    const chainManifest = await this.all()

    // get all available chain IDs
    const chainIds = Object.keys(chainManifest)

    // make sure we support the chain
    if (!chainIds.includes(id)) throw new Error('Chain not supported')

    // check if we have the spec for the chain already cached locally
    let _chain = this.cachedChainSpecs[id]

    // if not, go initialize it
    if (!_chain) {
      _chain = new Chain(id)
      await _chain.init()
      this.cachedChainSpecs[id] = _chain
    }

    if (!field) {
      return _chain
    } else {
      // make array to iterate
      const fields = typeof field === 'string' ? [field] : field
      const values = {}

      fields.forEach(key => {
        values[key] = get(_chain, field)
      })

      return values
    }
  }
}
