import React, { Component } from 'react';

/* Import Components */

import Input from '../components/Input';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        email: '',
        password: ''
      }
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handlePassword(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, password: value } }),
      () => console.log(this.state.newUser)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({ newUser: { ...prevState.newUser, [name]: value } }),
      () => console.log(this.state.newUser)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch('http://example.com', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        console.log('Successful' + data);
      });
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          inputType={'text'}
          title={'Email'}
          name={'email'}
          value={this.state.newUser.email}
          placeholder={'Enter your email'}
          handleChange={this.handleInput}
        />{' '}
        {/* Name of the user */}
        <Input
          inputType={'password'}
          name={'password'}
          title={'Password'}
          value={this.state.newUser.password}
          placeholder={'Enter your password'}
          handleChange={this.handlePassword}
        />
        <Button
          action={this.handleFormSubmit}
          type={'primary'}
          title={'Submit'}
          style={buttonStyle}
        />{' '}
        {/*Submit */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px'
};

export default FormContainer;
