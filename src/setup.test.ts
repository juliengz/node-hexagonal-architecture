import { setup } from './setup';

describe('my setup works fine', () => {
    test('it should answer : true', () => {
        expect(setup()).toEqual(true);
    });
});
