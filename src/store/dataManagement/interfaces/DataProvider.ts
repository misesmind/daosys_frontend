export interface DataProviderInterface {
    write(key: string, value: string): Promise<void>;

    read(key: string): Promise<string | undefined>;

    remove(key: string): Promise<void>;

    list(): Promise<string[]>;
}

export default DataProviderInterface;