import {test} from 'uvu'
import {type} from 'uvu/assert'
import {getPaths} from '../src'

test('tinypath', () => {
	type(getPaths, 'function', 'exports a function')
})

test.run()
