import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactItem from './ContactItem';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contact = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contact);
    // if (parsedContacts) {
    setContacts(parsedContacts);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = evt => {
    setFilter(evt.target.value);
  };

  const handleSubmit = event => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === event.name.toLowerCase()
      )
    ) {
      alert('This contact name already exists.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: event.name,
      number: event.number,
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const delContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>PhoneBook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={delContact}>
        <ContactItem />
      </ContactList>
    </div>
  );
}

export default App;

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount(prevProps, prevState) {
//     const contact = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contact);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== this.prevState) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   handleFilterChange = evt => {
//     this.setState({ filter: evt.target.value });
//   };

//   handleSubmit = event => {
//     if (
//       this.state.contacts.find(
//         contact => contact.name.toLowerCase() === event.name.toLowerCase()
//       )
//     ) {
//       alert('This contact name already exists.');
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name: event.name,
//       number: event.number,
//     };
//     this.setState({
//       contacts: [...this.state.contacts, newContact],
//     });
//   };

//   delContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     return (
//       <div>
//         <h1>PhoneBook</h1>
//         <ContactForm handleSubmit={this.handleSubmit} />
//         <h2>Contacts</h2>
//         <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={this.delContact}
//         >
//           <ContactItem />
//         </ContactList>
//       </div>
//     );
//   }
// }

// export default App;
