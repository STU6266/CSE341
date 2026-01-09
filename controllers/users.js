// controllers/users.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET /users
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .find();

    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /users/:id
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .find({ _id: userId });

    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // Feldname richtig schreiben, wie in der DB und im Swagger-Model
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .insertOne(user); // kleingeschrieben: insertOne

    if (response.acknowledged) {
      // 201 = Created
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      // erfolgreich, aber kein Body nötig
      res.status(204).send();
    } else {
      res
        .status(404)
        .json(response.error || 'User not found or nothing to update.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('users')
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(404)
        .json(response.error || 'User not found or already deleted.');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
