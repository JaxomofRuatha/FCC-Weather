export function toMetricTemp(temps) {
  if (Array.isArray(temps)) {
    return temps.map(val => Math.round(val - 32) * (5 / 9));
  }
  return Math.round((temps - 32) * (5 / 9));
}

export function fromMetricTemp(temps) {
  if (Array.isArray(temps)) {
    return temps.map(val => Math.round(val * (9 / 5) + 32));
  }
  return Math.round(temps * (9 / 5) + 32);
}

export function toMetricDist(dists) {
  if (Array.isArray(dists)) {
    return dists.map(val => Math.round(val * 1.6));
  }
  return Math.round(dists * 1.6);
}

export function fromMetricDist(dists) {
  if (Array.isArray(dists)) {
    return dists.map(val => Math.round(val * 0.6));
  }
  return Math.round(dists * 0.6);
}
