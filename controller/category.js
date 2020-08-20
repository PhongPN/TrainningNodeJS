const Category = require("../model/category");
const Product = require("../model/product");

// Create and Save a new Category
exports.create = (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        Category
            .create(req.body)
            .then((category) => {
                res.send(category);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    } else {
        res.status(400).send({ message: "Category can not be empty" });
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    Category.find({})
        .then(category => {
            res.send(category);
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
    Category.findOne({ category_id: id })
        .then((category) => {
            res.send(category);
        })
        .catch((err) => {
            res.sendStatus(404).send(err);
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    let id = req.params.id

    Category.findOneAndUpdate({ category_id: id }, req.body)
        .then((category) => {
            res.send(category);
            // Category.findOne({ category_id: id }).then((category) => {
            //     res.send(category);
            // }).catch(err=>{
            //     console.log(err)
            // });
        })
        .catch((err) => {
            res.sendStatus(404).send({ err });
        })

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    let id = req.params.id;
    if (Category.findOne(category_name).category_name != Product.findOne(product_category)) {
        Category.findOneAndRemove({ category_id: id })
            .then((category) => {
                res.send("Delete user");
            })
            .catch((err) => {
                res.sendStatus(404).send(err);
            });
    } else res.sendStatus(400).send({ err })
};