type Primitives = string | number | boolean
type DeepPartial<T extends {}> = {
    [P in keyof T]?: T[P] extends {} ? DeepPartial<T[P]> : T[P]
}
export declare type TinyPaths<T extends {}, TPropsWithOnlySelfProperty extends string = never, TPath extends string = never> = DeepPartial<{
    [P in keyof T]:
    P extends TPropsWithOnlySelfProperty ? P :
        T[P] extends Array<unknown> ? P :
            T[P] extends Primitives ? P : (TinyPaths<T[P]> & { self: P })
}>
export declare type TinyPathGetPaths = <TObject extends {}>(paths: TinyPaths<TObject>) => TinyPaths<TObject>
const getPaths: TinyPathGetPaths = <TObject extends {}>(obj) => {
    const iterate = (
        obj: TObject,
        base: string
    ) => Object.keys(obj)
        .reduce((acc, value) => {
            const path = base ? `${base}.${value}` : value
            return typeof obj[value] !== 'object'
                ? value === 'self'
                    ? acc as ReturnType<TinyPathGetPaths>
                    : {...acc as ReturnType<TinyPathGetPaths>, [value]: path}
                : {
                    ...acc as ReturnType<TinyPathGetPaths>,
                    [value]: {...iterate(obj[value], path), self: path}
                }
        }, {} as ReturnType<TinyPathGetPaths>)
    return iterate(obj, '')
}
export {getPaths}
