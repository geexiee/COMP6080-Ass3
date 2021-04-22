import React from 'react';
import Header from '../components/Header';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

describe('Header testing', () => {
  // check header has a dashboard link
  it('has a link labelled dashboard', () => {
    const header = shallow(<Header />);
    expect(header.find(Link).find('#dashboardLink').text()).toEqual('Dashboard');
  });

  // check header has a join game link
  it('has a link labelled "join game"', () => {
    const header = shallow(<Header />);
    expect(header.find('#joinGameLink').text()).toEqual('Join Game');
  });

  // check header has a home link named big brain
  it('has a link labelled "Home"', () => {
    const header = shallow(<Header />);
    expect(header.find('#homeLink').text()).toEqual('Big Brain');
  });
});
