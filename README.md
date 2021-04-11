# tinypath [![CI](https://img.shields.io/github/workflow/status/smurygin/tinypath/CI?style=flat-square)](https://img.shields.io/github/workflow/status/smurygin/tinypath/CI?style=flat-square) [![codecov](https://img.shields.io/codecov/c/github/smurygin/tinypath?style=flat-square)](https://img.shields.io/codecov/c/github/smurygin/tinypath?style=flat-square)
A tiny utility for generating chains of object property paths.
<img src="https://github.com/smurygin/tinypath/raw/master/logo.svg" align="right" alt="logo" width="120" height="120">

## Usage

```js
import { getPaths } from 'tinypath'

getPaths({
  root: 'root',
  lvl1: {
    propLvl1: 'propLvl1',
    lvl2: {
      propLvl2: 'propLvl1'
    }
  }
})
// =>
// {
//   "root": "root",
//   "lvl1": {
//     "propLvl1": "lvl1.propLvl1",
//     "lvl2": {
//       "propLvl2": "lvl1.lvl2.propLvl2",
//       "self": "lvl1.lvl2"
//     },
//     "self": "lvl1"
//    }
// }
```

## API: `getPaths(object[, options])`

* `object`: **Object**
* `options?`: **TinyPathOptions**

### `TinyPathOptions`

`depth?: number`

Default: `0`

`base?: string`

Default: `''`

`separator?: string`

Default: `'.'`

---

![licence](https://img.shields.io/badge/MIT-Dmitry%20Smurygin-inactive?link=https://raw.githubusercontent.com/smurygin/tinypath/master/LICENSE&link=http://smurygin.com)
