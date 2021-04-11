import {test} from 'uvu'
import {equal, is, type} from 'uvu/assert'
import {getPaths, TinyPathGetPaths, TinyPaths} from '../src'

interface ITestCaseObj {
	propRoot: string;
	propContainerLevel1: {
		propInsideLevel1: string;
		propContainerLevel2: {
			propInsideLevel2: string;
		}
	}
}

const setupTestCase = (): [TinyPaths<ITestCaseObj>, ReturnType<TinyPathGetPaths>] => [
	{
		propRoot: 'propRoot',
		propContainerLevel1: {
			propInsideLevel1: 'propInsideLevel1',
			propContainerLevel2: {
				propInsideLevel2: 'propInsideLevel2'
			}
		}
	},
	{
		propRoot: 'propRoot',
		propContainerLevel1: {
			self: 'propContainerLevel1',
			propInsideLevel1: 'propContainerLevel1.propInsideLevel1',
			propContainerLevel2: {
				self: 'propContainerLevel1.propContainerLevel2',
				propInsideLevel2: 'propContainerLevel1.propContainerLevel2.propInsideLevel2'
			}
		}
	}
]

test('tinypath', () => {
	type(getPaths, 'function', 'exports a function')
})

test('should return an object with the same structure, but with values that are the full path to the full path to each property', () => {
	const [object, expected] = setupTestCase()
	const objectPath = getPaths<ITestCaseObj>(object)

	equal(objectPath, expected)
})

test('should return the path to the property which contains an object. In this case, it is can be obtained by the "self" keyword.', () => {
	const [object] = setupTestCase()
	const objectPath = getPaths<ITestCaseObj>(object)

	is(objectPath.propContainerLevel1.self, 'propContainerLevel1')
	is(objectPath.propContainerLevel1.propContainerLevel2.self, 'propContainerLevel1.propContainerLevel2')
})

test.run()
