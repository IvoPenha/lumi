import { Router } from 'express';
import BillRoute from '../useCases/bill/bill.route';
import errorMiddleware from '../core/middlewares/error.middleware';

const IndexRouter = Router();

IndexRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

IndexRouter.use('/bill', BillRoute);

IndexRouter.use(errorMiddleware);

export { IndexRouter };
