import User from '../../model/user.js'
import { Search } from '../../middleware/fuzzySearch.js'
import { generateToken, generateResetToken } from '../../helper/jwt.js'

//Login and generate JWT
const login = async (data) => {
	try {
		const result = await User.verifyPassword(data)
		// console.log(result)
		if (!result.error) {
			const token = await generateToken(result.message)
			return {
				status: 200,
				code: "LOGIN_SUCCESS",
				message: "Login success",
				token
			}
		} else {
			return {
				status: 400,
				code: "LOGIN_FAILED",
				message: "Login failed"
			};
		}
	} catch (err) {
		console.log(err)
		return {
			status: 500,
			code: "SERVER_ERROR",
			message: "Server error"
		};
	};
}

// Create and Save a new User
const createUser = async (newUser) => {
	try {
		const findExistUser = await User.findOne({ user_username: newUser.user_username })
		if (!findExistUser) {
			const user = await User.create(newUser)
			return ({
				status: 200,
				code: "CREATE_SUCCESS",
				message: "Create success"
			})
		}
		else return ({
			status: 400,
			code: "USER_EXIST",
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
// const findAllUser =  (username) => {
// 	return new Promise((resolve, reject) => {
// 		User.find({})
// 			.then(user => {
// 				return user
// 			.catch(err => {
// 				return err
// 			});
// 	})

// };

const findUserByUserName = async (username, page, limit) => {
	try {
		const findUser = await Search(User, 'user_username', username, page, limit)
		console.log(findUser)
		if (typeof findUser !== "undefined") {
			return ({
				status: 200,
				code: "FIND_SUCCESS",
				message: "Find success",
				userlist: findUser
			});
		}
		else return ({
			status: 400,
			code: "FIND_FAILED",
			message: "Find failed"
		})
	} catch (err) {
		return ({
			status: 500,
			code: "SEVER_ERROR",
			message: "Find failed"
		})
	}
}

// Find a single User with an id
const findOneUser = (id) => {
	return new Promise((resolve, reject) => {
		User.findOne({ _id: id })
			.then((user) => {
				console.log(user);
				if (user) {
					user.password = undefined
					return resolve({
						status: 200,
						code: "FIND_USER_SUCCESS",
						message: "find user success"
					})
				} else {
					return resolve({
						status: 400,
						code: "FIND_USER_FAIL",
						message: "find user fail"
					})
				}
			})
			.catch((err) => {
				return reject({
					status: 500,
					code: "SEVER_ERROR",
					message: "Find user failed"
				})
			});
	})
};

// Update a User by the id in the request
const updateUser = (id, data) => {
	return new Promise((resolve, reject) => {
		User.findOneAndUpdate({ _id: id }, data)
			.then((user) => {
				return resolve({
					status: 200,
					code: "UPDATE_USER_SUCCESS",
					message: "update user success"
				});
			})
			.catch((err) => {
				return reject({
					status: 500,
					code: "SEVER_ERROR",
					message: "update user failed"
				});
			});
	})

};

// Delete a User with the specified id in the request
const deleteUser = (id) => {
	return new Promise((resolve, reject) => {
		User.findOneAndRemove({ user_id: id })
			.then(() => {
				return resolve({
					status: 200,
					code: "DELETE_USER_SUCCESS",
					message: "delete user success"
				});
			})
			.catch((err) => {
				return reject({
					status: 500,
					code: "SEVER_ERROR",
					message: "update user failed"
				});
			});
	})
};

const forgotPassword = async (data) => {
	try {
		// find user
		const user = await User.findOne({ user_username: data.username })
		// => 404
		if (!user) {
			return ({
				status: 404,
				code: "USER_NOT_FOUND",
				message: "User not found"
			})
		}
		// Gen token
		else {
			const resetToken = generateResetToken()
			// update
			User.findOneAndUpdate({ user_username: data.username }, resetToken)
			return ({
				status: 200,
				code: "SUCCESS",
				message: "Reset password success",
				token: resetToken
			});
		}
	} catch (err) {
		return ({
			status: 500,
			code: "SEVER_ERROR",
			message: "Server error"
		});
	}
}

const resetNewPassword = async (id, data) => {
	try {
		const user = await User.findOne({ _id: id })
		if (!user) {
			return ({
				status: 400,
				code: "FAILED",
				message: "Update password failded"
			});
		}
		else {
			const now = new Date;
			const updateUser = await User.findOneAndUpdate({ resetToken: data.resetToken, resetTokenExpired: { $gte: now } }, { user_userpass: data.password, resetToken: undefined });
			return ({
				status: 200,
				code: "SUCCESS",
				message: "Update password success"
			});
		}
	} catch (err) {
		return ({
			status: 500,
			code: "SEVER_ERROR",
			message: "Server error"
		});
	}
}

export {
	login,
	createUser,
	findUserByUserName,
	findOneUser,
	updateUser,
	deleteUser,
	forgotPassword,
	resetNewPassword
}