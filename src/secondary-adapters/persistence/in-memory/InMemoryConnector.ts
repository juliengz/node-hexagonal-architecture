import assert from 'assert';
import { IConnector } from '../interfaces/IConnector';

export class InMemoryConnector implements IConnector {
    private callCount: number = 0

    async connect(): Promise<void> {
        this.callCount++;
    }

    async disconnect(): Promise<void> {
        this.callCount = 0;
    }

    reset() {
        this.callCount = 0;
    }

    hasBeenCalled(): boolean {
        return this.callCount > 0;
    }

    hasNotBeenCalled(): boolean {
        return this.callCount === 0;
    }

    hasBeenCalledNTimes(n: number): boolean {
        return this.callCount === n;
    }

    async isConnectionValid(): Promise<boolean> {
        try {
            await assert.deepStrictEqual(this.hasBeenCalledNTimes(1), true);

            return true;
        } catch (_) {
            return false;
        }
    }
}
