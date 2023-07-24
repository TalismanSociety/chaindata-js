>
> This repo (chaindata-js) is no longer maintained - head to the [chaindata repo](https://github.com/TalismanSociety/chaindata) to find up to date instructions on how to use chaindata.
>

# 📁 Chaindata JS Wrapper
This repository is a JS helper library for the [@talismn/chaindata](https://github.com/talismansociety/chaindata) repository, enabling easy fetching of assets and config files for developers when building within the polkadot ecosystem.

The goals of this repo are:

1. Allow developers to easily use the @talismn/chaindata repository in applications
2. Allow developers to discover availability of chains & chains assets

>Note: This repoository is in development and may contain bugs and change without warning. Use at your own discretion.

----

## Usage

#### Installation

```bash
yarn add @talismn/chaindata-js
```

#### Importing

```bash
import chaindata from 'chaindata'
```

### Discover chains
Discover which chains are available

```js
const chains = await chaindata.chains()
```

The returned object contains key:value pairs of all available <b>chain ids</b> and <b>names</b>.

```json5
{
  "0": "Polkadot",
  "2": "Kusama",
  // ... etc
}
```

### Load a chain by ID
Fetch a chains by ID and load all relevant information. In this instance Polkadot (id: 0).

```js
const chain = await chaindata.chain(0)
```

The returned object contains all relevant information about the requested chain.

```json5
{
  "id": "0",
  "name": "Polkadot",
  "description": "Polkadot is a heterogeneous multichain with shared security and interoperability",
  "isRelay": true,
  "links":{
    "Website": "https://polkadot.network",
    "Twitter": "https://twitter.com/Polkadot",
    "Support": "https://support.polkadot.network/support/home",
    "Discord": "https://discord.com/invite/wGUDt2p",
    "Github": "https://github.com/paritytech/polkadot"
  },
  "assets":{
    "logo": "logo.svg",
    "banner": "banner.png",
    "card": "card.png"
  },
  "rpcs": [
    "wss://rpc.polkadot.io"
  ],
  "status": "READY",
}
```

### Fetch chain details
To access any fields on the chains, using the instance above

```js
const name = chain.name
```

Which returns the value requested, i.e:

```text
Polkadot
```

### Fetch chain assets
To access any assets on the chain, using the instance above:

```js
const logo = chain.asset.logo
```

Which returns a string as the full path to the asset file.

```string
https://raw.githubusercontent.com/TalismanSociety/chaindata/master/0/assets/logo.svg
```

And can be used in an img tag:

```html
<img src={logo}/>
```

----

## Notes
1. The main chain config and chain details are fetched on the fly, as requested, and cached locally for the session
