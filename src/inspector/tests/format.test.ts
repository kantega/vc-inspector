import { test, expect } from 'vitest';
import inspect from '../inspector';
import examples from './examples.json';

test('test all examples', () => {
  examples.forEach((example) => {
    if (typeof example.data === 'string') {
      expect(inspect(example.data).success).toBeTruthy();
    } else {
      expect(inspect(JSON.stringify(example.data)).success).toBeTruthy();
    }
  });
});
