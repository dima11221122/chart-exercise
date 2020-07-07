import { ValueFormatterPipe } from './value-formatter.pipe';

describe('ValueFormatterPipe', () => {
  let pipe: ValueFormatterPipe;
  beforeEach(() => pipe = new ValueFormatterPipe());

  const cases: { name: string, input: number, expected: string }[] = [
    { name: 'should return null if input is nan', input: NaN, expected: null },
    { name: 'should return input value if the value is lower than 1000', input: 123, expected: '123' },
    { name: 'should return value with k suffix if the value is greater than 1000', input: 14135, expected: '14k' },
    { name: 'should return value with M suffix if the value is greater than 1000000', input: 64871561, expected: '65M' },
    { name: 'should return value with B suffix if the value is greater than 1000000000', input: 8987182645, expected: '9B' }
  ];
  for (const { name, input, expected } of cases) {
    it(name, () => expect(pipe.transform(input)).toEqual(expected))
  }
});
