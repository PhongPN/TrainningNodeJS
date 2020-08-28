import {createOrder, findAllOrderByUserID, findOneOrder, updateOrder, deleteOrder} from './order.js'

export const createO= async (req,res) => {
    try{
        const result = await createOrder(req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const findO = async (req,res) => {
    try{
        const result = await findOneOrder(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const findOs = async (req,res) => {
    try{
        const result = await findAllOrderByUserID(req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const updateO = async (req,res) => {
    try{
        const result = await updateOrder(req.params.id, req.body)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const deleteO = async (req,res) => {
    try{
        const result = await deleteOrder(req.params.id)
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}