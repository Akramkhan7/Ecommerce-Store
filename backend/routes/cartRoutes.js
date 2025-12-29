import express from 'express';
import { addToCart,updateCart,getUserCart } from '../controllers/cartController';

const cartRouter = express.Router();


cartRouter.post('/get',getUserCart);
cartRouter.post('/get',updateCart);
cartRouter.post('/get',addToCart);

export default cartRouter;