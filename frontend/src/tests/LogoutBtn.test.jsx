import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../components/LogoutBtn'

describe('Logout Button testing', () => {
  // check that logout button has correct text and exists
  it('is labelled logout', () => {
    const logoutbtn = shallow(<Logout />);
    expect(logoutbtn.text()).toContain('Logout');
  });
});
