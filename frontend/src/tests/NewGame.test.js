import React from 'react';
import { shallow } from 'enzyme';
import NewGame from '../pages/NewGame'
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

describe('NewGame testing', () => {
  // check that it has header 'New Game'
  it('has a header labelled "New Game"', () => {
    const NewGameComponent = shallow(<NewGame />);
    expect(NewGameComponent.find('#newGameHeader').text()).toEqual('New Game');
  });
  // check that it has upload button
  it('has a file upload button labelled "Upload Game"', () => {
    const NewGameComponent = shallow(<NewGame />);
    expect(NewGameComponent.find(Input).text()).toEqual('Upload Game');
  });

  // check that it has create button
  it('has a file upload button labelled "Upload Game"', () => {
    const NewGameComponent = shallow(<NewGame />);
    expect(NewGameComponent.find(Button).prop('children')).toContain('Create');
  });
});
