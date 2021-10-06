import Chains from './chains'

const instance = () => {
  const chains = new Chains()
  return {
    chains: async () => await chains.all(),
    chain: async (id: string | number, field?: string) => await chains.chainById(id, field),
  }
}

const Instance = instance()

export default Instance
