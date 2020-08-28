import Order from '../../model/order.js';
import User from '../../model/user.js';
import Product from '../../model/product.js';

// Create and Save a new Category
const createOrder = async (data) => {
	try {
		const user = await User.findOne({ _id: data.user_id });
		if (!user) return {
			status:400,
			code: "USER_NOT_FOUND",
			message: "user not found"
		}
		else {
			const order = await Order.create(data);
			return {
				status: 200,
				code:"CREATE_ORDER_SUCCESS",
				message: order._id
			}
		}
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			code: "SEVER_ERROR",
			message: "create failed"
		};
	}
};
// Retrieve all Users from the database.
const findAllOrderByUserID = async (data) => {
	try {
		const user = await User.findOne({ _id: data.userId, status: "active" });
		if (!user) return {
			status:400,
			code: "USER_NOT_FOUND",
			message: "user not found"
		}
		else {
			const orders = await Order.find({
				userId: user._id,
				status: { $ne: "deleted" },
			});
			return {
				status: 200,
				code:"FIND_ORDER_SUCCESS",
				message: order._id,
				order: orders.map((e) => {
					return { id: e._id, status: e.status, date: e.createdAt };
				})
			}
				
		}
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			code: "SEVER_ERROR",
			message: "find failed"
		};
	}
};

// Find a single User with an id
const findOneOrder = async (id) => {
	try {
		const order = await Order.findOne({ _id: id })
			.populate('userId', 'fullName')
			.populate({
				path: "products",
				populate: {
					path: "productId",
					model: Product,
					select: ['name', 'price']
				},
			}).exec()

		if (!order)
		return {
			status:400,
			code: "USER_NOT_FOUND",
			message: "user not found"
		}
		else {
			return {
				status: 200,
				code:"FIND_ORDER_SUCCESS",
				message: order._id,
				order: orders.map((e) => {
					return { id: e._id, status: e.status, date: e.createdAt };
				})
			}
		}
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			code: "SEVER_ERROR",
			message: "find failed"
		};
	}
};

// Update a User by the id in the request
const updateOrder = async (id, data) => {
	try {
		const order = await Order.findByIdAndUpdate({ _id: id }, data);
		if (!order) return {
			status: 200,
			code:"UPDATE_ORDER_SUCCESS",
			message: order._id,
			order: orders.map((e) => {
				return { id: e._id, status: e.status, date: e.createdAt };
			})
		}
			return {
				status:400,
				code: "USER_NOT_FOUND",
				message: "user not found"
			}
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			code: "SEVER_ERROR",
			message: "update failed"
		};
	}
};
// Delete a User with the specified id in the request
const deleteOrder = async (id) => {
	try {
		const order = await Order.findOneAndUpdate(
			{ _id: id, status: "pending" },
			{ status: "deleted" }
		);
		if (!order) return {
			status: 200,
			code:"DELETE_ORDER_SUCCESS",
			message: "delete success"
		}
		else {
			return {
				status:400,
				code: "USER_NOT_FOUND",
				message: "user not found"
			}
		}
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			code: "SEVER_ERROR",
			message: "delete failed"
		};
	}
};


export {
	createOrder,
	findAllOrderByUserID,
	findOneOrder,
	updateOrder,
	deleteOrder
};