function AddressBook() {
  this.contacts = [];
  this.initialComplete = false;
}

AddressBook.prototype.getInitialContacts = function(cb) {
  var self = this;
  
  setTimeout(function() {
    self.initialComplete = true;
    if (cb) {
      return cb();
    }
  }, 3);
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