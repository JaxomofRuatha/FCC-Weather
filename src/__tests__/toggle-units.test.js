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

  it('correctly toggles siUnits boolean', () => {
    const newState = toggleUnits(mockState);

    expect(newState.siUnits).toBeTruthy();
  });

  it('correctly converts temperature to Celsius', () => {
    const newState = toggleUnits(mockState);

    expect(newState.current.temp).toEqual(1);
  });

  it('correctly converts distance to kilometers', () => {
    const newState = toggleUnits(mockState);

    expect(newState.current.wind.value).toEqual(53);
    expect(newState.current.visibility.value).toEqual(53);
  });
});
