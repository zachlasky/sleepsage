import { getSupplementsQueryString } from '../query';

describe('getSupplementsQueryString', () => {
  it('returns an empty string when no parameters are provided', () => {
    const result = getSupplementsQueryString({});
    expect(result).toBe('');
  });

  it('returns a query string with a single interaction', () => {
    const result = getSupplementsQueryString({ interaction: 'test' });
    expect(result).toBe('?interaction=test');
  });
  it('returns a query string with multiple interactions', () => {
    const result = getSupplementsQueryString({ interaction: ['test1', 'test2'] });
    expect(result).toBe('?interaction=test1&interaction=test2');
  });

  it('returns a query string with a single risk', () => {
    const result = getSupplementsQueryString({ risk: 'test' });
    expect(result).toBe('?risk=test');
  });
  it('returns a query string with multiple risks', () => {
    const result = getSupplementsQueryString({ risk: ['test1', 'test2'] });
    expect(result).toBe('?risk=test1&risk=test2');
  });

  it('returns a query string with a single symptom', () => {
    const result = getSupplementsQueryString({ symptom: 'test' });
    expect(result).toBe('?symptom=test');
  });
  it('returns a query string with multiple symptoms', () => {
    const result = getSupplementsQueryString({ symptom: ['test1', 'test2'] });
    expect(result).toBe('?symptom=test1&symptom=test2');
  });

  it('returns a query string with multiple parameters', () => {
    const result = getSupplementsQueryString({
      interaction: ['test1', 'test2'],
      risk: 'test3',
      symptom: ['test4', 'test5']
    });
    const result2 = getSupplementsQueryString({
      interaction: ['test1', 'test2'],
      risk: ['test3']
    });
    expect(result).toBe(
      '?interaction=test1&interaction=test2&risk=test3&symptom=test4&symptom=test5'
    );
    expect(result2).toBe('?interaction=test1&interaction=test2&risk=test3');
  });
});
