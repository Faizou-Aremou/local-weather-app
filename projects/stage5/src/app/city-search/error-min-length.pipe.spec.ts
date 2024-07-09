import { ErrorMinLengthPipe } from './error-min-length.pipe';

describe('ErrorMinLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorMinLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
