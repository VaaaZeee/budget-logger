import { IsEqualDates } from './is-equal-dates-dates.pipe';

describe('CompareDatesPipe', () => {
  it('create an instance', () => {
    const pipe = new IsEqualDates();
    expect(pipe).toBeTruthy();
  });
});
