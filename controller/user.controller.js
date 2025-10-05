import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users
        });
    }catch (error) {
        return next(error);
    }   
}
export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id).select('-password');  
          if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
          }
          res.status(200).json({ success: true, data: user });
        }catch(error){
            next(error);
        }
};

export const  createUser = async (req, res, next) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({success:true, data: user});
    }
    catch(error){
        return next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false, message: 'User not found'});
        }
        user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({success:true, data: user});
    }catch(error){ 
        return next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false, message: 'User not found'});
        }
        await user.remove();
        res.status(200).json({success:true, message: 'User deleted successfully'});
    }catch(error){
        return next(error);
    }
};
