import Category from '../../model/category.js';
import product from '../../model/product.js';

// Create and Save a new Category
const createCategory = async (newCategory) => {
	try {
		const findExistCategory = await Category.findOne({ category_title: newCategory.category_title })
		if (!findExistCategory) {
			const catgory = await Category.create(newCategory)
			return ({
				status: 200,
				code: "CREATE_SUCCESS",
				message: "Create success"
			})
		}
		else return ({
			status: 400,
			code: "CATEGORY_EXIST",
			message: "Create failed"
		})
	} catch (err) {
		return ({
			status: 500,
			code: "SEVER_ERROR",
			message: "Create failed"
		})
	}
};

// Retrieve all Users from the database.
const findAllCategory = () => {
	return new Promise((resolve, reject) => {
		Category.find({})
			.then(category => {
				return resolve({
					status: 200,
					code: "FIND_CATEGORY_SUCCESS",
					message: "find category success"
				})
			})
			.catch(err => {
				return reject({
					status: 500,
					code: "SEVER_ERROR",
					message: "Find user failed"
				})
			});
	})
};

// Find a single Category with an id
const findOneCategory = (id) => {
	return new Promise((resolve, reject) => {
		Category.findOne({ _id: id })
			.then((category) => {
				if (category) {
					return resolve({
						status: 200,
						code: "FIND_CATEGORY_SUCCESS",
						message: "find category success"
					})
				} else {
					return resolve({
						status: 400,
						code: "FIND_CATEGORY_FAIL",
						message: "find user fail"
					})
				}
			})
			.catch((err) => {
				return reject({
					status: 500,
					code: "SEVER_ERROR",
					message: "Find category failed"
				})
			});
	})
};

// Update a User by the id in the request
const updateCategory = (id, data) => {
	return new Promise((resolve, reject) => {
		Category.findOneAndUpdate({ _id: id }, data)
			.then((user) => {
				return resolve({
					status: 200,
					code: "UPDATE_CATEGORY_SUCCESS",
					message: "update category success"
				});
			})
			.catch((err) => {
				return reject({
					status: 500,
					code: "SEVER_ERROR",
					message: "update category failed"
				});
			});
	})
};

// Delete a User with the specified id in the request
const deleteCategory = async (id) => {
	try {
		const category = await Category.findOneAndDelete({ _id: id });
		if (!category) {
			return {
				status: 400,
				code: "DELETE_CATEGORY_FAIL",
				message: "Delete user fail"
			};
		}
		const products = await product.find({ category_id: id })
		products.forEach(p => {
			product.findOneAndUpdate({ _id: p._id }, { category_id: '' })
		})
		return {
			status: 200,
			code: "UPDATE_CATEGORY_SUCCESS",
			message: "update category success"
		};
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			code: "SEVER_ERROR",
			message: "update category failed"
		};
	}
};

export {
	createCategory,
	findOneCategory,
	findAllCategory,
	updateCategory,
	deleteCategory
}