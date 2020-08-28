import Product from '../../model/product.js';


const getProductByName = (product) => {
	return Product.findOne({ product_name: product.product_name });
};
// Create and Save a new Category
const createProduct = async (body, res) => {
  try {
    const category = await Category.findById(body.category_id);
    if(!category) {
      return {
				status: 400,
				code: "CREATE_PRODUCT_FAIL",
				message: "create fail"
			}
    }
    else{
      const product = await Product.create(body);
      return {
				status: 200,
				code: "CREATE_PRODUCT_SUCCESS",
				message: "create success"
			}
    }
  } catch (err) {
    console.log(err);
    return {
			status: 500,
			code: "SEVER_ERROR",
			message: "create product failed"
		};
  }
};

// Retrieve all Users from the database.
const findAllProduct = async () => {
  try {
    const products = await Product.find({});
    if(!products) {
      return {
				status: 400,
				code: "FIND_PRODUCT_FAIL",
				message: "find fail"
			}
    }
    else{
      return {
				status: 200,
				code: "FIND_PRODUCT_SUCCESS",
				message: "find success"
			}
    }
  } catch (err) {
    console.log(err);
    return {
			status: 500,
			code: "SEVER_ERROR",
			message: "find product failed"
		};
  }
}
// Find a single User with an id
const findOneProduct = async (id) => {
  try {
    const product = await Product.findOne({ _id: id });
    if(!product) {
      return {
				status: 400,
				code: "FIND_PRODUCT_FAIL",
				message: "find fail"
			}
    }
    else{
      console.log(product)
      const category = await Category.findOne({_id: product.product_category_id})
      return {
				status: 200,
				code: "FIND_PRODUCT_SUCCESS",
				message: "find success"
			}
    }
  } catch (err) {
    console.log(err);
    return {
			status: 500,
			code: "SEVER_ERROR",
			message: "find product failed"
		};
  }
};

// Update a User by the id in the request
const updateProduct = async (id, data) => {
	try {
		const product = await Product.findOneAndUpdate({_id: id},data)
		if(!product) {
			return {
				status: 400,
				code: "UPDATE_PRODUCT_FAIL",
				message: "update fail"
			}
		}
		else{
			return {
				status: 200,
				code: "UPDATE_PRODUCT_SUCCESS",
				message: "update success"
			}
		}
	}catch(err){
		console.log(err);
		return {
			status: 500,
			code: "SEVER_ERROR",
			message: "update product failed"
		};
	}
};
// Delete a User with the specified id in the request
const deleteProduct = async (id) => {
  try {
    const product = await Product.findOneAndDelete({_id: id})
    if(!product) {
      return {
				status: 400,
				code: "DELETE_PRODUCT_FAIL",
				message: "delete fail"
			}
    }
    else{
      return {
				status: 200,
				code: "DELETE_PRODUCT_SUCCESS",
				message: "delete success"
			}
    }
  }catch(err){
    console.log(err);
    return {
			status: 500,
			code: "SEVER_ERROR",
			message: "delete failed"
		};
  }
}
export{
	createProduct,
	findAllProduct,
	findOneProduct,
	updateProduct,
	deleteProduct,
	getProductByName
};