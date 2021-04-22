import React from 'react';
import { shallow } from 'enzyme';
import Register from '../pages/Register'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

describe('Registration form basic field testing', () => {
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

describe('submitting registration form', () => {
  const name = 'John';
  const email = 'john@example.com';
  const invalidEmail = 'bademail';
  const password = 'password';
  const badpassword = 'notpassword';
  const passwordMismatchMessage = "Passwords don't match, please try again";
  const invalidEmailMessage = 'Please enter a valid email';

  it('verify that an appropriate alert message is thrown when mismatching passwords are submitted', () => {
    window.alert = jest.fn();
    const registrationForm = shallow(<Register />);
    // simulate entering name
    let nameTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Name');
    nameTextField.simulate('change', { target: { value: name } });
    // simulate entering email
    let emailTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Email');
    emailTextField.simulate('change', { target: { value: email } });
    // simulate entering password1
    let passwordTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Password');
    passwordTextField.simulate('change', { target: { value: password } });
    // simulate entering password2
    let password2TextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Confirm Password');
    password2TextField.simulate('change', { target: { value: badpassword } });
    registrationForm.update();
    nameTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Name');
    emailTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Email');
    passwordTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Password');
    password2TextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Confirm Password');
    // verify that the fields were filled in
    expect(nameTextField.props().value).toEqual(name);
    expect(emailTextField.props().value).toEqual(email);
    expect(passwordTextField.props().value).toEqual(password);
    expect(password2TextField.props().value).toEqual(badpassword);
    // click register
    registrationForm.find('#registerButton').simulate('click');
    // check for alert
    expect(window.alert).toHaveBeenCalledWith(passwordMismatchMessage);
  });

  it('verify that an appropriate alert message is thrown when an invalid email is submitted', () => {
    window.alert = jest.fn();
    const registrationForm = shallow(<Register />);
    // simulate entering name
    let nameTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Name');
    nameTextField.simulate('change', { target: { value: name } });
    // simulate entering email
    let emailTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Email');
    emailTextField.simulate('change', { target: { value: invalidEmail } });
    // simulate entering password1
    let passwordTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Password');
    passwordTextField.simulate('change', { target: { value: password } });
    // simulate entering password2
    let password2TextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Confirm Password');
    password2TextField.simulate('change', { target: { value: password } });
    registrationForm.update();
    nameTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Name');
    emailTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Email');
    passwordTextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Password');
    password2TextField = (registrationForm.find(TextField)).findWhere((node) => node.props().label === 'Confirm Password');
    // verify that the fields were filled in
    expect(nameTextField.props().value).toEqual(name);
    expect(emailTextField.props().value).toEqual(invalidEmail);
    expect(passwordTextField.props().value).toEqual(password);
    expect(password2TextField.props().value).toEqual(password);
    // click register
    registrationForm.find('#registerButton').simulate('click');
    // check for alert
    expect(window.alert).toHaveBeenCalledWith(invalidEmailMessage);
  });
});
