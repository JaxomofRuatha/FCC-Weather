function toCelsius(val) {
  return Math.round((val - 32) * 5 / 9);
}

function toFahrenheit(val) {
  return Math.round(val * 9 / 5 + 32);
}

function toKilometers(val) {
  return Math.round(val * 1.609344);
}

function toMiles(val) {
  return Math.round(val * 0.62137119);
}

export function toMetricTemp(temps) {
  if (Array.isArray(temps)) {
    return temps.map(val => toCelsius(val));
  }
  return toCelsius(temps);
}

export function fromMetricTemp(temps) {
  if (Array.isArray(temps)) {
    return temps.map(val => toFahrenheit(val));
  }
  return toFahrenheit(temps);
}

export function toMetricDist(dists) {
  if (Array.isArray(dists)) {
    return dists.map(val => toKilometers(val));
  }
  return toKilometers(dists);
}

export function fromMetricDist(dists) {
  if (Array.isArray(dists)) {
    return dists.map(val => toMiles(val));
  }
  return toMiles(dists);
}
