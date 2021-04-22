import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../pages/Dashboard';
import Button from '@material-ui/core/Button';

describe('Dashboard testing', () => {
  it('has an "add new game" button', () => {
    const dashboard = shallow(<Dashboard/>);
    expect(dashboard.find(Button).text()).toEqual('Create New Game');
  });
});
