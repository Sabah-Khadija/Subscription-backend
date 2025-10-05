import { Router } from "express";  
import authorize from "../middleware/auth.middleware.js";
import { createSubscription } from "../controller/subscription.controller.js";
import { getUserSubscriptions } from "../controller/subscription.controller.js";
import { getSubscriptions } from "../controller/subscription.controller.js";
import { getSubscription } from "../controller/subscription.controller.js";
import { updateSubscription } from "../controller/subscription.controller.js";
import { deleteSubscription } from "../controller/subscription.controller.js";
import { upcomingRenewalsSubscriptions } from "../controller/subscription.controller.js";
import { cancelSubscription } from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);
subscriptionRouter.get('/:id', getSubscription);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', updateSubscription);
subscriptionRouter.delete('/:id', deleteSubscription);

subscriptionRouter.post('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.put('/:id/cancel', cancelSubscription);
subscriptionRouter.get('/:id/upcoming-renewals', upcomingRenewalsSubscriptions);

export default subscriptionRouter;