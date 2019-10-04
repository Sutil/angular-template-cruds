import { EnumToArrayPipe } from './enum-to-array.pipe';

enum MockEnum {
    FIRST,
    SECOND,
    THIRD,
    LAST,
}

describe('EnumToArrayPipe', () => {
    it('should transform an enum to array', () => {
        const directive = new EnumToArrayPipe();

        const expectedArray = [
            'FIRST', 'SECOND', 'THIRD', 'LAST',
        ];

        const transformed = directive.transform(MockEnum);
        expect(transformed).toEqual(expectedArray);
    });
});
