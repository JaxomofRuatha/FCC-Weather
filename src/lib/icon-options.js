const weatherObj = {
  'clear-day': {
    icon: 'CLEAR_DAY',
    color: '#fce637',
    background: './images/backclearday.png'
  },
  'clear-night': {
    icon: 'CLEAR_NIGHT',
    color: '#FFFFFF',
    background: './images/backclearnight.jpg'
  },
  'partly-cloudy-day': {
    icon: 'PARTLY_CLOUDY_DAY',
    color: '#FFFDED',
    background: './images/backpartlycloudyday.png'
  },
  'partly-cloudy-night': {
    icon: 'PARTLY_CLOUDY_NIGHT',
    color: '#edf4ff',
    background: './images/backpartlycloudynight.jpg'
  },
  'cloudy': {
    icon: 'CLOUDY',
    color: '#edf4ff',
    background: './images/backcloudy.png'
  },
  'rain': {
    icon: 'RAIN',
    color: '#91bbff',
    background: './images/backrain.jpg'
  },
  'sleet': {
    icon: 'SLEET',
    color: '#7d99c6',
    background: './images/backsleet.png'
  },
  'snow': {
    icon: 'SNOW',
    color: '#B2FFE1',
    background: './images/backsnow.png'
  },
  'wind': {
    icon: 'WIND',
    color: '#3FBF74',
    background: './images/backwind.png'
  },
  'fog': {
    icon: 'FOG',
    color: '#cdd1d6',
    background: './images/backfog.jpg'
  }
};

function iconOptions(currentIcon) {
  return weatherObj[currentIcon];
}

export default iconOptions;
