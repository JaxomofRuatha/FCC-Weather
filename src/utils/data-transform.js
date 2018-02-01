export function getLocalCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return { lat: position.coords.latitude, lng: position.coords.longitude }
      },

      // If geolocation fails, query ipinfo.io

      () => {
        fetch('https://ipinfo.io/geo', apiOpts)
          .then(res => res.json())
          .then((res) => {
            const location = res.loc.split(',');
            this._getForecast(location[0], location[1]);
            this._getReverseGeolocation(location[0], location[1]);
            this.setState({
              currentCoords: { lat: location[0], lng: location[1] }
            });
          });
      }
    );
  }
}

export function getForecast {

}