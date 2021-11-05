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
  async chainById(id: string): Promise<Chain> {
    id = id.toString()

    // get supported chain manifest
    const chainManifest = await this.all()

    // get all available chain IDs
    const chainIds = Object.keys(chainManifest)

    // make sure we support the chain
    if (!chainIds.includes(id)) throw new Error(`Chain ${id} not supported`)

    // check if we have the spec for the chain already cached locally
    let chain = this.cachedChainSpecs[id]

    // if not, go initialize it
    if (!chain) {
      chain = new Chain(id)
      await chain.init()
      this.cachedChainSpecs[id] = chain
    }

    return chain
  }

  async chainFieldById(id: string, field: string): Promise<{ [key: string]: any }> {
    const chain = await this.chainById(id)

    // make array to iterate
    const fields = typeof field === 'string' ? [field] : field
    const values = {}

    fields.forEach(key => {
      values[key] = get(chain, field)
    })

    return values
  }
}
