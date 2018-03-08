import React from 'react';

import App from '../App';

describe('App component tests', () => {
  it('should render correctly', () => {
    const testApp = shallow(<App />);

    // expect(testApp).toMatchSnapshot();
  });

  it('should update the coordinates', () => {
    const testApp = mount(<App />);
    const testCoords = { lat: 33, lng: 33 };

    console.log(testApp.debug());
    expect(testApp.state.currentCoords).not.toBeTruthy();
    testApp.setCoords(testCoords);
    expect(testApp.state.currentCoords).toEqual(testCoords);
  });
});
