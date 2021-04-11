import {test} from 'uvu'
import {equal, is, type} from 'uvu/assert'
import { getPaths, TinyPathInput, TinyPathOutput } from '../src'

interface ITestCaseObj {
	propRoot: string;
	propContainerLevel1: {
		propInsideLevel1: string;
		propContainerLevel2: {
			propInsideLevel2: string;
		}
	}
}

const setupTestCase = (): [TinyPathInput<ITestCaseObj>, TinyPathOutput<ITestCaseObj>] => [
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

test('should return property paths with specified root path', () => {
	const [object] = setupTestCase()
	const objectPath = getPaths<ITestCaseObj>(object, {base: 'root'})

	is(objectPath.propRoot, 'root.propRoot')
	is(objectPath.propContainerLevel1.propInsideLevel1, 'root.propContainerLevel1.propInsideLevel1')
	is(objectPath.propContainerLevel1.propContainerLevel2.propInsideLevel2, 'root.propContainerLevel1.propContainerLevel2.propInsideLevel2')
})

test('should return property paths with specified separator', () => {
	const [object] = setupTestCase()
	const objectPath = getPaths<ITestCaseObj>(object, {separator: ':'})

	is(objectPath.propContainerLevel1.propContainerLevel2.propInsideLevel2, 'propContainerLevel1:propContainerLevel2:propInsideLevel2')
})

test('should return property paths with specified deep level', () => {
	const [object] = setupTestCase()
	const objectPathDepth1 = getPaths<ITestCaseObj>(object, {depth: 1})

	is(Object.keys(objectPathDepth1).length, 2)
	is(objectPathDepth1.propRoot, 'propRoot')
	is(objectPathDepth1.propContainerLevel1, 'propContainerLevel1')

	const objectPathDepth2 = getPaths<ITestCaseObj>(object, {depth: 2})

	is(Object.keys(objectPathDepth2).length, 2)
	is(Object.keys(objectPathDepth2.propContainerLevel1).length, 3)
	is(objectPathDepth2.propRoot, 'propRoot')
	is(objectPathDepth2.propContainerLevel1.propInsideLevel1, 'propContainerLevel1.propInsideLevel1')
	is(objectPathDepth2.propContainerLevel1.propContainerLevel2, 'propContainerLevel1.propContainerLevel2')
})

test('should return the path to the property which contains an object. In this case, it is can be obtained by the "self" keyword.', () => {
	const [object] = setupTestCase()
	const objectPath = getPaths<ITestCaseObj>(object)

	is(objectPath.propContainerLevel1.self, 'propContainerLevel1')
	is(objectPath.propContainerLevel1.propContainerLevel2.self, 'propContainerLevel1.propContainerLevel2')
})

test.run()
