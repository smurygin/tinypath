import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const common = {
	output: [
		{
			dir: 'dist',
			format: 'esm'
		},
	],
	plugins: [
		ts({ include: ['./src/**/*.ts'] }),
		terser()
	]
}

export default [
	{
		input: 'src/index.ts',
		...common,
	}
]
