import Subscription from '../models/subscription.model.js';


export const getSubscriptions = async (req, res, next) => {
    try{
        const subscriptions = await Subscription.find();
        res.status(200).json({success:true, data: subscriptions});
    }catch(error){
        return next(error);
    }  
};

export const getSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            return res.status(404).json({success:false, message: 'Subscription not found'});
        }
        res.status(200).json({success:true, data: subscription});

    }catch(error){
        return next(error);
    }
};
export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create(
            {
                ...req.body,
                user: req.user._id
            });
        res.status(201).json({success:true, data: subscription});
    }catch(error){
                return next(error);
            }
        
}
export default createSubscription ;
   

export const updateSubscription = async (req, res, next) => {
    try{
        let subscription = await Subscription.findById(req.params.id); 
        if(!subscription){
            return res.status(404).json({success:false, message: 'Subscription not found'});
        }
        subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        res.status(200).json({success:true, data: subscription});
    }catch(error){
        return next(error);
    }
};
export const getUserSubscriptions = async (req, res, next) => {
    try{
        //if the user is not the same as the one in the token
        if(req.user.id !== req.params.id){
            return res.status(403).json({ success: false, message: 'Not authorized to access these subscriptions' });
        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    }catch(error){
        return next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            return res.status(404).json({success:false, message: 'Subscription not found'});
        }
        await subscription.remove();
        res.status(200).json({success:true, message: 'Subscription deleted successfully'});
    }catch(error){
        return next(error);
    } 
};

export const upcomingRenewalsSubscriptions = async (req, res, next) => {
    try{
        const currentDate = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(currentDate.getMonth() + 1);
        const subscriptions = await Subscription.find({
            renewalDate: {
                $gte: currentDate,
                $lt: nextMonth
            }
        });
        res.status(200).json({success:true, data: subscriptions});
    }catch(error){
        return next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            return res.status(404).json({success:false, message: 'Subscription not found'});
        }
        subscription.status = 'canceled';
        await subscription.save();
        res.status(200).json({success:true, message: 'Subscription canceled successfully', data: subscription});
    }catch(error){
        return next(error);
    }
};