const mockGeolocation = {
  getCurrentPosition: jest.fn(onSuccess =>
    onSuccess({
      coords: {
        latitude: 40,
        longitude: 49
      }
    })),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;
