import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header';

describe('Header', () => {
  // const noop = () => {};

  it('has a dashboard link', () => {
    const header = shallow(<Header />);
    console.log(header.text());
    console.log(header.find('Dashboard').text());
    console.log(header.find('Dashboard').to);
    expect(header.find('Dashboard').text().toContain('Dashboard'));
  });

  it('has a link to join game', () => {
    const header = shallow(<Header />);
    console.log(header.find('Join Game').text());
    console.log(header.find('Join Game'));
    expect(header.find('Join Game').text().toContain('Join Game'));
  });

  it('has a logout button', () => {
    const header = shallow(<Header />);
    console.log(header.find('Logout').text());
    expect(header.find('Logout').text().toContain('Logout'));
    console.log(header.find('Logout'));
  });
});
