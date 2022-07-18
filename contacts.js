const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (err) {
    console.log(err.message);
  }
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(
        contacts.filter((contact) => contact.id === contactId.toString())
      );
    })
    .catch((err) => console.log(err.message));
}

async function removeContact(contactId) {
  try {
    let data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newData = JSON.stringify(
      contacts.filter((contact) => contact.id !== contactId.toString())
    );
    await fs.writeFile(contactsPath, newData, "utf-8");
    data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    let data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.push({
      name,
      email,
      phone,
      id: (Number(contacts[contacts.length - 1].id) + 1).toString(),
    });
    const newData = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, newData, "utf-8");
    data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
