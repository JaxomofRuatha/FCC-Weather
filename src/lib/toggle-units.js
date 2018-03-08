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

export default function toggleUnits(current, tempRange, weekWeather, siUnits) {
  let newValues;
  if (!siUnits) {
    newValues = {
      current: Object.assign({}, current, {
        temp: toMetricTemp(current.temp),
        wind: {
          value: toMetricDist(current.wind.value),
          units: 'kph'
        },
        visibility: {
          value: toMetricDist(current.visibility.value),
          units: 'kilometers'
        }
      }),
      tempRange: toMetricTemp(tempRange),
      weekWeather: weekHelper(weekWeather, toMetricTemp),
      siUnits: true
    };
  } else if (siUnits) {
    newValues = {
      current: Object.assign({}, current, {
        temp: fromMetricTemp(current.temp),
        wind: {
          value: fromMetricDist(current.wind.value),
          units: 'mph'
        },
        visibility: {
          value: fromMetricDist(current.visibility.value),
          units: 'miles'
        }
      }),
      tempRange: fromMetricTemp(tempRange),
      weekWeather: weekHelper(weekWeather, fromMetricTemp),
      siUnits: false
    };
  }
  return newValues;
}
