import { fetchLocalCoords } from '../lib/api';

describe('API function calls', () => {
  describe('Fetch local coordinates', () => {
    it('returns a value', async () => {
      const newCoords = await fetchLocalCoords();

      expect(newCoords).toBeDefined();
    });

    it('returns an object with correct properties', async () => {
      const newCoords = await fetchLocalCoords();

      expect(newCoords).toHaveProperty('lat');
      expect(newCoords).toHaveProperty('lng');
    });

    it('returns a valid object without navigator function', async () => {
      navigator.geolocation = null;

      const newCoords = await fetchLocalCoords();

      expect(newCoords).toHaveProperty('lat');
      expect(newCoords).toHaveProperty('lng');
    });
  });
});
