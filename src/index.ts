type Primitives = string | number | boolean
type DeepPartial<T extends {}> = {
    [P in keyof T]?: T[P] extends {} ? DeepPartial<T[P]> : T[P]
}
type TinyPaths<T extends {}, TOutput, TPropsWithOnlySelfProperty extends string = never> = DeepPartial<{
    [P in keyof T]:
    P extends TPropsWithOnlySelfProperty ? P :
        T[P] extends Array<unknown> ? P :
            T[P] extends Primitives ? TOutput extends true ? string :
                P : (TinyPaths<T[P], TOutput, TPropsWithOnlySelfProperty> & { self: TOutput extends true ? string : P })
}>
export declare type TinyPathInput<T extends {}, TPropsWithOnlySelfProperty extends string = never> = TinyPaths<T, false, TPropsWithOnlySelfProperty>
export declare type TinyPathOutput<T extends {}, TPropsWithOnlySelfProperty extends string = never> = TinyPaths<T, true, TPropsWithOnlySelfProperty>
export declare type TinyPathOptions = {depth: number; base: string; separator: string}
export declare type TinyPathGetPaths = <TObject extends {}>(paths: TinyPathInput<TObject>, options?: Partial<TinyPathOptions>) => TinyPathOutput<TObject>
const getPaths: TinyPathGetPaths = <TObject extends {}>(obj, options = {} as TinyPathOptions) => {
    const {base = '', depth = 0, separator = '.'} = options
    const iterate = (
        obj: TObject,
        d: number,
        base: string
    ) => Object.keys(obj)
        .reduce((acc, value) => {
            const path = base ? `${base}${separator}${value}` : value
            return typeof obj[value] !== 'object'
                ? value === 'self'
                    ? acc as TinyPathOutput<TObject>
                    : {...acc as TinyPathOutput<TObject>, [value]: path}
                : {
                    ...acc as TinyPathOutput<TObject>,
                    ...(!depth || d < depth
                        ? {[value]: {...iterate(obj[value], d+1, path), self: path}}
                        : {[value]: path})
                }
        }, {} as TinyPathOutput<TObject>)
    return iterate(obj, 1, base)
}
export {getPaths}
