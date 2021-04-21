import React from 'react';
import { shallow } from 'enzyme';
import Register from '../pages/Register'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

describe('Registration form testing', () => {
  it('has a text field labelled name', () => {
    const registrationForm = shallow(<Register/>);
    expect((registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Name').exists()).toEqual(true);
  });

  it('has a text field labelled Email', () => {
    const registrationForm = shallow(<Register/>);
    expect((registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Email').exists()).toEqual(true);
  });

  it('has a text field labelled Password', () => {
    const registrationForm = shallow(<Register/>);
    expect((registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Password').exists()).toEqual(true);
  });

  it('has a register button', () => {
    const registrationForm = shallow(<Register />);
    expect(registrationForm.find(Button).text()).toEqual('Register');
  });

  it('has a name text field which is empty by default', () => {
    const registrationForm = shallow(<Register />);
    expect((registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Name').props().value).toEqual('');
  });

  it('has an email text field which is empty by default', () => {
    const registrationForm = shallow(<Register />);
    expect((registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Email').props().value).toEqual('');
  });

  it('has an password text field which is empty by default', () => {
    const registrationForm = shallow(<Register />);
    expect((registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Password').props().value).toEqual('');
  });
});
