import toggleUnits from '../lib/toggle-units';

const mockCurrent = {
  temp: 33,
  wind: {
    value: 33,
    units: 'mph'
  },
  visibility: {
    value: 33,
    units: 'miles'
  }
};

const mockTempRange = [33, 36];

const mockWeekWeather = [
  {
    day: 'Mon',
    high: 36,
    low: 33,
    icon: 'CLEAR_DAY'
  }
];

const mockSIUnits = false;

describe('Toggle SI Units', () => {
  it('correctly toggles siUnits boolean', () => {
    const newState = toggleUnits(
      mockCurrent,
      mockTempRange,
      mockWeekWeather,
      mockSIUnits
    );

    expect(newState.siUnits).toBeTruthy();
  });

  it('correctly converts temperature to Celsius', () => {
    const newState = toggleUnits(
      mockCurrent,
      mockTempRange,
      mockWeekWeather,
      mockSIUnits
    );

    expect(newState.current.temp).toEqual(1);
  });

  it('correctly converts distance to kilometers', () => {
    const newState = toggleUnits(
      mockCurrent,
      mockTempRange,
      mockWeekWeather,
      mockSIUnits
    );

    expect(newState.current.wind.value).toEqual(53);
    expect(newState.current.visibility.value).toEqual(53);
  });
});
