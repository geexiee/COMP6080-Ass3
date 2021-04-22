import React from 'react';
import Header from '../components/Header';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

describe('Header testing', () => {
  it('has a link labelled dashboard', () => {
    const header = shallow(<Header />);
    expect(header.find(Link).find('#dashboardLink').text()).toEqual('Dashboard');
  });

  it('has a link labelled "join game"', () => {
    const header = shallow(<Header />);
    expect(header.find('#joinGameLink').text()).toEqual('Join Game');
  });

  it('has a link labelled "Home"', () => {
    const header = shallow(<Header />);
    expect(header.find('#homeLink').text()).toEqual('Big Brain');
  });
});
