function AddressBook() {
  this.contacts = [];
}

AddressBook.prototype.addContact = function(contact) {
  this.contacts.push(contact);
}

AddressBook.prototype.getContact = function(contactId) {
  return this.contacts[contactId];
}

AddressBook.prototype.deleteContact = function(contactId) {
  this.contacts.splice(contactId, 1);
}