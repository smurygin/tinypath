# tinypath [![CI](https://img.shields.io/github/workflow/status/smurygin/tinypath/CI?style=flat-square)](https://img.shields.io/github/workflow/status/smurygin/tinypath/CI?style=flat-square) [![codecov](https://img.shields.io/codecov/c/github/smurygin/tinypath?style=flat-square)](https://img.shields.io/codecov/c/github/smurygin/tinypath?style=flat-square) 

A tiny utility for generating chains of object property paths.

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

---

MIT
