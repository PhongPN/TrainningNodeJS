import {createCategory, findOneCategory, findAllCategory, updateCategory, deleteCategory} from './category.js';

export const createC = async (req, res) => {
    try{
        const result = await createCategory(req.body);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const findC= async (req, res) => {
    try{
        const result = await findOneCategory(req.params.id);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const findCs =async (req, res) =>{
    try{
        const result = await findAllCategory();
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}



export const updateC= async (req, res) =>{
    try{
        const result = await updateCategory(req.params.id, req.body);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}

export const deleteC = async (req, res) =>{
    try{
        const result = await deleteCategory(req.params.id, req.body);
        res.status(result.status).json(result);
    }catch(err){
        console.log(err)
        res.status(err.status).json(err);
    }
}
