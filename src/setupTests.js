import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

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
