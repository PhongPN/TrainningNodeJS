const User = require("../model/user");

//Login and generate JWT
exports.login = async (req, res) => {
    //Login a registered user
    User.verifyPassword(req.body, (token) => {
        console.log(token)
        res.status(200).send(token)
    });
};
// Create and Save a new User
exports.create = (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        User
            .create(req.body)
            .then((user) => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    } else {
        res.status(400).send({ message: "User can not be empty" });
    }
    // // Validate request
    // if (!req.body.title) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }

    // // Create a User
    // const user = new User({
    //     title: req.body.title,
    //     description: req.body.description,
    //     published: req.body.published ? req.body.published : false
    // });

    // // Save User in the database
    // User
    //     .save(user)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the User."
    //         });
    //     });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    // User.find()
    //     .then(user => {
    //         user = user.map(user => {
    //             console.log(user)
    //             return { 'Fullname': user.userfirstname + ' ' + user.userlastname, 'role': user.role }
    //         })
    //         res.send(user);
    //     })
    //     .catch((err) => {
    //         res.status(400).send({err});
    //     });
    // const title = req.query.title;
    //var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    User.find({})
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    let id = req.params.id
    User.findOne({ user_id: id })
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.sendStatus(404).send(err);
        });
    // const id = req.params.id;
    // User.findById(id)
    //     .then(data => {
    //         if (!data)
    //             res.status(404).send({ message: "Not found User with id " + id });
    //         else res.send(data);
    //     })
    //     .catch(err => {
    //         res
    //             .status(500)
    //             .send({ message: "Error retrieving User with id=" + id });
    //     });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    let id = req.params.id
    console.log(req.body)
    User.findOneAndUpdate({ user_id: id }, req.body)
        .then(() => {
            User.findOne({ user_id: id }).then((user) => {
                res.send(user);
            });
        })
        .catch((err) => {
            res.sendStatus(404).send(err);
        })
    // if (!req.body) {
    //     return res.status(400).send({
    //         message: "Data to update can not be empty!"
    //     });
    // }

    // const id = req.params.id;

    // User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 message: `Cannot update User with id=${id}. Maybe User was not found!`
    //             });
    //         } else res.send({ message: "User was updated successfully." });
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating User with id=" + id
    //         });
    //     });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;
    User.findOneAndRemove({ user_id: id })
        .then((user) => {
            res.send("Delete user");
        })
        .catch((err) => {
            res.sendStatus(404).send(err);
        });
    // const id = req.params.id;

    // User.findByIdAndRemove(id, { useFindAndModify: false })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 message: `Cannot delete User with id=${id}. Maybe User was not found!`
    //             });
    //         } else {
    //             res.send({
    //                 message: "User was deleted successfully!"
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete User with id=" + id
    //         });
    //     });
};