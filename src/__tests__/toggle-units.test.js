import toggleUnits from '../lib/toggle-units';

const mockState = {
  current: {
    temp: 33,
    wind: {
      value: 33,
      units: 'mph'
    },
    visibility: {
      value: 33,
      units: 'miles'
    }
  },
  tempRange: [33, 36],
  weekWeather: [
    {
      day: 'Mon',
      high: 36,
      low: 33,
      icon: 'CLEAR_DAY'
    }
  ],
  siUnits: false
};

describe('Toggle SI Units', () => {
  it('returns a new object', () => {
    const newState = toggleUnits(mockState);

    expect(newState).not.toEqual(mockState);
  });
});
