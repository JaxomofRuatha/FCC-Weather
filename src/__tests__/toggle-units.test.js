import toggleUnits from '../lib/toggle-units';

const mockCurrent = {
  temp: faker.random.number({ min: -50, max: 120 }),
  wind: {
    value: faker.random.number({ min: 0, max: 100 }),
    units: 'mph'
  },
  visibility: {
    value: faker.random.number({ min: 0, max: 100 }),
    units: 'miles'
  }
};

const mockTempRange = [
  faker.random.number({ min: -50, max: 120 }),
  faker.random.number({ min: -50, max: 120 })
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const mockWeekWeather = days.map(day => ({
  day,
  high: faker.random.number({ min: -50, max: 120 }),
  low: faker.random.number({ min: -50, max: 120 }),
  icon: 'CLEAR_DAY'
}));

describe('Toggle SI Units', () => {
  it('correctly toggles siUnits boolean', () => {
    const newState = toggleUnits(
      mockCurrent,
      mockTempRange,
      mockWeekWeather,
      false
    );

    expect(newState.siUnits).toBeTruthy();
  });

  it('correctly converts temperature to Celsius', () => {
    const staticTempCurrent = Object.assign({}, mockCurrent, { temp: 33 });
    const newState = toggleUnits(
      staticTempCurrent,
      mockTempRange,
      mockWeekWeather,
      false
    );

    expect(newState.current.temp).toEqual(1);
  });

  it('correctly converts temperature to Fahrenheit', () => {
    const staticTempCurrent = Object.assign({}, mockCurrent, { temp: 33 });
    const newState = toggleUnits(
      staticTempCurrent,
      mockTempRange,
      mockWeekWeather,
      true
    );

    expect(newState.current.temp).toEqual(91);
  });

  it('correctly converts distance to kilometers', () => {
    const staticDistCurrent = Object.assign({}, mockCurrent, {
      wind: {
        value: 33,
        units: 'mph'
      },
      visibility: {
        value: 33,
        units: 'miles'
      }
    });
    const newState = toggleUnits(
      staticDistCurrent,
      mockTempRange,
      mockWeekWeather,
      false
    );

    expect(newState.current.wind.value).toEqual(53);
    expect(newState.current.visibility.value).toEqual(53);
  });

  it('correctly converts distance to miles', () => {
    const staticDistCurrent = Object.assign({}, mockCurrent, {
      wind: {
        value: 33,
        units: 'kph'
      },
      visibility: {
        value: 33,
        units: 'kilometers'
      }
    });
    const newState = toggleUnits(
      staticDistCurrent,
      mockTempRange,
      mockWeekWeather,
      true
    );

    expect(newState.current.wind.value).toEqual(21);
    expect(newState.current.visibility.value).toEqual(21);
  });

  xit('correctly converts week temperature to Celsius', () => {});
  xit('correctly converts week temperature to Fahrenheit', () => {});
  xit('correctly converts week distance to kilometers', () => {});
  xit('correctly converts week units to miles', () => {});
});
