const Product = require("../model/product");

// Create and Save a new Category
exports.create = (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        console.log(req.body)
        Product
            .create(req.body)
            .then((product) => {
                res.send(product);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    } else {
        res.status(400).send({ message: "Product can not be empty" });
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    Product.find({})
        .then(product => {
            res.send(product);
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
    Product.findOne({ product_id: id })
        .then((product) => {
            res.send(product);
        })
        .catch((err) => {
            res.sendStatus(404).send(err);
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    let id = req.params.id
    Product.findOneAndUpdate({ product_id: id }, req.body)
        .then((product) => {
            res.send(product);
        })
        .catch((err) => {
            res.sendStatus(404).send(err);
        })

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;
    Product.findOneAndRemove({ product_id: id })
        .then((product) => {
            res.send("Delete user");
        })
        .catch((err) => {
            res.sendStatus(404).send(err);
        });
};