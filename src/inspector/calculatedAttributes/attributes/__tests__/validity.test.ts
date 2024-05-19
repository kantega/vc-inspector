import { expect, test } from 'vitest';
import { parseValidityDates } from '../validity';

const invalidResult = {
  kind: 'ok',
  value: {
    isValid: false,
    validityDates: {
      validFrom: {
        kind: 'some',
        value: new Date(Date.parse('2021-01-01')),
      },
      validUntil: {
        kind: 'some',
        value: new Date(Date.parse('2021-12-31')),
      },
    },
  },
};

const validResult = {
  kind: 'ok',
  value: {
    isValid: true,
    validityDates: {
      validFrom: {
        kind: 'some',
        value: new Date(Date.parse('2021-01-01')),
      },
      validUntil: {
        kind: 'some',
        value: new Date(Date.parse('2121-12-31')),
      },
    },
  },
};

test('parse validity dates with dates out of range | W3C VC2', () => {
  const obj = {
    validFrom: '2021-01-01',
    validUntil: '2021-12-31',
  };

  const result = parseValidityDates(obj);

  expect(result.W3C_V2).toEqual(invalidResult);
});

test('parse validity dates within date range | W3C VC2', () => {
  const obj = {
    validFrom: '2021-01-01',
    validUntil: '2121-12-31',
  };

  const result = parseValidityDates(obj);

  expect(result.W3C_V2).toEqual(validResult);
});
