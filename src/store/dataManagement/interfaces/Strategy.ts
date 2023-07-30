export interface StrategyInterface {

    store(key: string, value: { payload: any, action: string }): Promise<void>;

    get(key: string): Promise<
        Object | String | Array<any> | undefined
    >;

    remove(key: string): Promise<void>;

    list(): Promise<string[]>;

}

export default StrategyInterface;