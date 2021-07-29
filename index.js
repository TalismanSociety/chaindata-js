import Chains from './chains'

const instance = () => {
  const chains = Chains()
  return {
    chains: async () => await chains.all(),
    chain: async id => await chains.chainById(id),
  }
}

const Instance = instance()

export default Instance