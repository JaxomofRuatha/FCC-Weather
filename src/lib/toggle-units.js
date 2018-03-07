import {
  toMetricTemp,
  fromMetricTemp,
  toMetricDist,
  fromMetricDist
} from '../utils/unit-converters';

function weekHelper(week, converter) {
  return week.map(day => ({
    day: day.day,
    high: converter(day.high),
    low: converter(day.low),
    icon: day.icon
  }));
}

export default function toggleUnits(currentWeather) {
  let newValues;
  if (!currentWeather.siUnits) {
    newValues = {
      current: Object.assign({}, currentWeather.current, {
        temp: toMetricTemp(currentWeather.current.temp),
        wind: {
          value: toMetricDist(currentWeather.current.wind.value),
          units: 'kph'
        },
        visibility: {
          value: toMetricDist(currentWeather.current.visibility.value),
          units: 'kilometers'
        }
      }),
      tempRange: toMetricTemp(currentWeather.tempRange),
      weekWeather: weekHelper(currentWeather.weekWeather, toMetricTemp),
      siUnits: true
    };
  } else if (currentWeather.siUnits) {
    newValues = {
      current: Object.assign({}, currentWeather.current, {
        temp: fromMetricTemp(currentWeather.current.temp),
        wind: {
          value: fromMetricDist(currentWeather.current.wind.value),
          units: 'mph'
        },
        visibility: {
          value: fromMetricDist(currentWeather.current.visibility.value),
          units: 'miles'
        }
      }),
      tempRange: fromMetricTemp(currentWeather.tempRange),
      weekWeather: weekHelper(currentWeather.weekWeather, fromMetricTemp),
      siUnits: false
    };
  }
  return newValues;
}
