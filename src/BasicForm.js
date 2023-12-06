import React from 'react';
import ReactDOM from 'react-dom/client';

class Person {
  constructor(name, email, phone){
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
};

function checkPerson(p){
  if(!p.name || !p.email || !p.phone) return false;
  const eReg = /\S+@\w+\.\w{2,}/;
  const pReg = /\d?s?(\d{3}|(\(\d{3}\)))s?-?s?\d{3}s?-?s?\d{4}/;

  if(!eReg.test(p.email) || !pReg.test(p.phone)) return false;

  return true;
}

class BasicForm extends React.Component {
  static displayName = "basic-input";
  state = { 
    people: [] 
  }; // <-- initial state

  onFormSubmit = (evt) => {
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const phone = this.refs.phone.value;
    const p = new Person(name, email, phone);
    
    if(checkPerson(p)){
      const people = [ ...this.state.people, p];
      console.log(people);
      this.setState({ people: people });
    }
    else{
      alert("Please fill out all sections correctly!");
    }
    this.refs.name.value = '';
    this.refs.email.value = '';
    this.refs.phone.value = '';
    evt.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
          />
          <input
            placeholder='Email'
            ref='email'
          />
          <input
            placeholder='Phone #'
            ref='phone'
          />

          <input type='submit' />
        </form>

        <div>
          <h3>Names</h3>
          <ul>
            { this.state.people.map((person, i) => <li key={i}>{person.name}<br></br>{person.email}<br></br>{person.phone}</li> ) }
          </ul>
        </div>
      </div>
    );
  }
};

export default BasicForm;
// ReactDOM.render(
//   <BasicForm />,
//   document.getElementById("root")
// );