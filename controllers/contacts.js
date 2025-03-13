const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  // const userId = new ObjectId(req.params.id);
  const contactId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.favoriteColor || !req.body.birthday) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
  .getDatabase()
  .db()
  .collection('contacts')
  .insertOne(contact);

  if (response.acknowledged) {
    res.status(201).json({ _id: response.insertedId});
  } else {
    res.status(500).json({ message: 'Failed to create contact.'});
  }
};

const updateContact = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.favoriteColor || !req.body.birthday) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const contactId = ObjectId.createFromHexString(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
  .getDatabase()
  .db()
  .collection('contacts')
  .replaceOne({ _id: contactId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Contact not found.'});
  }
};

const deleteContact = async (req, res) => {
  const contactId = ObjectId.createFromHexString(req.params.id);

  const response = await mongodb
  .getDatabase()
  .db()
  .collection('contacts')
  .deleteOne({ _id: contactId });

  if (response.deletedCount > 0) {
    res.status(200).json({ message: 'Contact deleted succesfully. '});
  } else {
    res.status(404).json({ message: 'Contact not found.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
