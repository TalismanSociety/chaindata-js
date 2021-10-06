const Chains = require('./chains')

const instance = () => {
  const chains = Chains()
  return {
    chains: async () => await chains.all(),
    chain: async (id, field = null) => await chains.chainById(id, field),
  }
}

const Instance = instance()

module.exports = Instance
