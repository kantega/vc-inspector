import { expect, test } from 'vitest';
import { parseCredentialSubject } from '../credentialSubject';

test('test nested class | W3C VC2 ', () => {
  const obj = {
    credentialSubject: {
      id: '123',
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        postal: '12345',
      },
    },
  };
  expect(parseCredentialSubject(obj).W3C_V2).toEqual({
    kind: 'ok',
    value: {
      claims: [
        {
          key: 'name',
          sd: false,
          value: 'John Doe',
        },
        {
          key: 'age',
          sd: false,
          value: 30,
        },
        {
          key: 'address',
          sd: false,
          value: [
            {
              key: 'street',
              sd: false,
              value: '123 Main St',
            },
            {
              key: 'city',
              sd: false,
              value: 'Anytown',
            },
            {
              key: 'state',
              sd: false,
              value: 'CA',
            },
            {
              key: 'postal',
              sd: false,
              value: '12345',
            },
          ],
        },
      ],
      id: '123',
    },
  });
});
