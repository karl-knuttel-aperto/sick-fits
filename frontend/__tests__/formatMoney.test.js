import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
    it('works with fractional dollars', () => {
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(10)).toEqual('$0.10');
        expect(formatMoney(40)).toEqual('$0.40');
    });

    it('leaves cents off for whole dollars', () => {
        expect(formatMoney(100)).toEqual('$1');
        expect(formatMoney(10000)).toEqual('$100');
        expect(formatMoney(10000000)).toEqual('$100,000');
    });
})