import payloadAction from './actions';

test('Shared / Higher order components / preload / actions', () => {
  const TYPE = 'TYPE';
  const PAYLOAD = 'PAYLOAD';
  const expected = { payload: PAYLOAD, type: TYPE };

  const actual = payloadAction(TYPE)(PAYLOAD);

  expect(actual).toEqual(expected);
});
