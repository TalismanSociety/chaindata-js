import Chain from './chain'
import Chains from './chains'

export { default as Chain } from './chain'
export { default as Chains } from './chains'

const instance = () => {
  const chains = new Chains()
  return {
    chains: async () => await chains.all(),
    chain: async (id: string | number): Promise<Chain> => await chains.chainById(id),
    chainField: async (id: string | number, field: string) => await chains.chainFieldById(id, field),
  }
}

const Instance = instance()

export default Instance
