import {createProduct, findAllProduct, findOneProduct, updateProduct, deleteProduct} from './product.js'

export const createP = async (req, res) => {
    try{
        const result = await createProduct(req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const findPs = async (req, res) => {
    try{
        const result = await findAllProduct
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const findP = async (req, res) => {
    try{
        const result = await findOneProduct(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const updateP = async (req, res) => {
    try{
        const result = await updateProduct(req.params.id, req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const deleteP = async (req, res) => {
    try{
        const result = await deleteProduct(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}