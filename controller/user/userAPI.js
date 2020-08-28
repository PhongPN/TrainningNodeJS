import { login, findOneUser, findUserByUserName, createUser, updateUser, deleteUser, forgotPassword, resetNewPassword } from './user.js'

export const Login = async (req, res) => {
	try {
		const result = await login(req.body);
		res.status(result.status).json(result);
	} catch (err) {
		console.log(err)
		res.status(err.status).json(err);
	}
}

export const findU = async (req, res) => {
	try {

		const result = await findOneUser(req.params.id);
		res.status(result.status).json(result);
	} catch (err) {
		console.log(err)
		res.status(err.status).json(err);
	}
}

export const findUs = async (req, res) => {
	try {
		const result = await findUserByUserName(req.body.username, req.query.page, req.query.limit);
		res.status(result.status).json(result);
	} catch (err) {
		console.log(err)
		res.status(err.status).json(err);
	}
}

export const register = async (req, res) => {
	try {
		const result = await createUser(req.body);
		res.status(result.status).json(result);
	} catch (err) {
		console.log(err)
		res.status(err.status).json(err);
	}
}

export const updateU = async (req, res) => {
	try {
		const result = await updateUser(req.params.id, req.body);
		res.status(result.status).json(result);
	} catch (err) {
		console.log(err)
		res.status(err.status).json(err);
	}
}

export const deleteU = async (req, res) => {
	try {
		const result = await deleteUser(req.params.id, req.body);
		res.status(result.status).json(result);
	} catch (err) {
		console.log(err)
		res.status(err.status).json(err);
	}
}

export const getResetPassword = async (req, res) => {
	const result = await forgotPassword(req.body);
	res.status(result.status).json(result);
}

export const resetPassword = async (req, res) => {
	const result = await resetNewPassword(req.params.id, req.body);
	res.status(result.status).json(result);
}
