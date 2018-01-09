const weatherObj = {
  'clear-day': {
    icon: 'CLEAR_DAY',
    color: '#fce637',
    background:
      'https://c.pxhere.com/photos/75/6c/sun_halo_rainbow_blue_sunny_day_beautiful_circle-720900.jpg!d'
  },
  'clear-night': {
    icon: 'CLEAR_NIGHT',
    color: '#FFFFFF',
    background:
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/February_-conservationlands15_Social_Media_Takeover-_Top_15_Places_on_National_Conservation_Lands_for_Night_Sky_Viewing_%2816358792937%29.jpg'
  },
  'partly-cloudy-day': {
    icon: 'PARTLY_CLOUDY_DAY',
    color: '#FFFDED',
    background: 'https://static.pexels.com/photos/55787/pexels-photo-55787.jpeg'
  },
  'partly-cloudy-night': {
    icon: 'PARTLY_CLOUDY_NIGHT',
    color: '#edf4ff',
    background:
      'https://upload.wikimedia.org/wikipedia/commons/d/d9/British_Night_Sky_%286819479424%29.jpg'
  },
  'cloudy': {
    icon: 'CLOUDY',
    color: '#edf4ff',
    background:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/Cloudy_Sky_of_Ahwaz.JPG'
  },
  'rain': {
    icon: 'RAIN',
    color: '#91bbff',
    background: 'https://static.pexels.com/photos/1553/glass-rainy-car-rain.jpg'
  },
  'sleet': {
    icon: 'SLEET',
    color: '#7d99c6',
    background:
      'https://upload.wikimedia.org/wikipedia/en/a/a3/Frozen_road_with_trees_december_2008_ice_storm.JPG'
  },
  'snow': {
    icon: 'SNOW',
    color: '#B2FFE1',
    background:
      'https://c.pxhere.com/photos/5b/e6/cold_snow_forest_winter_trees_fog_foggy_snowing-592107.jpg!d'
  },
  'wind': {
    icon: 'WIND',
    color: '#3FBF74',
    background:
      'https://c.pxhere.com/photos/72/27/landscape_spring_lake_nature_reserve_nature_moorland_wetland_summer_grasses-547407.jpg!d'
  },
  'fog': {
    icon: 'FOG',
    color: '#cdd1d6',
    background: 'https://static.pexels.com/photos/18855/pexels-photo.jpg'
  }
};

function iconOptions(currentIcon) {
  return weatherObj[currentIcon];
}

export default iconOptions;
