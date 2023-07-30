import DataProviderInterface from "../interfaces/DataProvider";

export class LocalStorageDataProvider implements DataProviderInterface {

    protected localStorage: WindowLocalStorage["localStorage"];

    constructor(localStorage: WindowLocalStorage["localStorage"]) {
        this.localStorage = localStorage;
    }

    async write(key: string, value: string): Promise<void> {
        try {
            this.localStorage.setItem(key, value);
        } catch (e) {
            throw new Error(`Could not write to local storage: ${e}`);
        }
    }

    async read(key: string): Promise<string | undefined> {
        try {
            return this.localStorage.getItem(key) ?? undefined;
        } catch (e) {
            throw new Error(`Could not read from local storage: ${e}`);
        }
    }

    async remove(key: string): Promise<void> {
        try {
            this.localStorage.removeItem(key);
        } catch (e) {
            throw new Error(`Could not remove from local storage: ${e}`);
        }
    }

    async list(): Promise<string[]> {
        try {
            return Object.keys(this.localStorage);
        } catch (e) {
            throw new Error(`Could not list local storage: ${e}`);
        }
    }
}