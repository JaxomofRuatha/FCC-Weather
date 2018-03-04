import moment from 'moment';

import apiSkeleton from '../utils/api-helpers';
import iconOptions from './icon-options';

const apiOpts = {
  cache: 'default',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'GET'
};

export function getLocalCoords() {
  // If browser geolocation is enabled, return current coordinates.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        return { lat, lng };
      },

      // If geolocation fails, query ipinfo.io to set the coordinates in state instead

      () => {
        apiSkeleton('https://ipinfo.io/geo', apiOpts).then((res) => {
          const location = res.loc.split(',');

          return { lat: location[0], lng: location[1] };
        });
      }
    );
  }
}

function getWeekWeather(res) {
  const weekWeather = [];

  // Populate data for the 7-day forecast in an array.
  for (let i = 1; i < 7; i++) {
    weekWeather.push({
      day: moment.unix(res.daily.data[i].time).format('ddd DD'),
      high: res.daily.data[i].temperatureHigh,
      low: res.daily.data[i].temperatureLow,
      icon: iconOptions(res.daily.data[i].icon)
    });
  }

  return weekWeather;
}

export function getForecast(lat, lng) {
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${lat},${lng}`;

  apiSkeleton(url, apiOpts).then((res) => {
    const weekWeather = getWeekWeather(res);

    return {
      current: {
        temp: res.currently.temperature,
        summary: res.currently.summary,
        dayForecast: res.hourly.summary,
        wind: { value: res.currently.windSpeed, units: 'mph' },
        humidity: res.currently.humidity,
        visibility: { value: res.currently.visibility, units: 'miles' },
        icon: iconOptions(res.currently.icon)
      },
      tempRange: [
        Math.floor(res.daily.data[0].temperatureLow),
        Math.floor(res.daily.data[0].temperatureHigh)
      ],
      weekWeather
    };
  });
}

export function getReverseGeolocation(lat, lng) {
  const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

  apiSkeleton(url, apiOpts).then(res =>
    `${res.results[3].address_components[0].long_name}, ${
      res.results[3].address_components[2].long_name
    }`);
}
