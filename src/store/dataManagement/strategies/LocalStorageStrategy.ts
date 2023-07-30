import { LocalStorageDataProvider } from "../drivers/LocalStorageDataProvider";
import StrategyInterface from "../interfaces/Strategy";

export class LocalStorageStrategy implements StrategyInterface {
    protected localStorage: LocalStorageDataProvider;

    constructor(localStorage: LocalStorageDataProvider) {
        this.localStorage = localStorage;
    }
    async get(key: string): Promise<string | undefined> {
        return this.localStorage.read(key);
    }
    async remove(key: string): Promise<void> {
        return this.localStorage.remove(key);
    }
    async list(): Promise<string[]> {
        return this.localStorage.list();
    }

    // key will be redux event name (e.g. contracts/addContract) so will be contracts
    async store(key: string, value: { payload: any, action: string }): Promise<void> {
        try {
            const existing = await this.localStorage.read(key);
            if (existing) {
                const existingArray = JSON.parse(existing);
                existingArray.push(value);
                await this.localStorage.write(key, JSON.stringify(existingArray));
            } else {
                await this.localStorage.write(key, JSON.stringify([value]));
            }
        } catch (e) {
            throw new Error(`Could not store in local storage: ${e}`);
        }
    }
}

export default LocalStorageStrategy;