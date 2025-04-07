import { createFileMiddleware } from '#/core/middlewares/file.middleware';
import { dataSource } from '#/infra';
import { pdfReader } from '#/infra/lib/pdf-reader';
import { Router } from 'express';
import { clientService } from '../client';
import { installationService } from '../installations';
import { BillController } from './bill.controller';
import { BillEntity } from './bill.entity';
import { BillRepository } from './bill.repository';
import { BillService } from './bill.service';
import { BillFileService } from './file/bill.file.service';
import { BillDashService } from './dash/bill.dash.service';

const BillRoute = Router();

const billRepository = new BillRepository(dataSource, BillEntity);

const billService = new BillService(
  billRepository,
  clientService,
  installationService
);

const billDashService = new BillDashService(billRepository);

const billFileService = new BillFileService(pdfReader);

const billController = new BillController(
  billService,
  billFileService,
  billDashService
);

const fileMiddleware = createFileMiddleware({
  uploadPath: null,
  maxFileSize: 20, // In MB
  acceptedMimeTypes: ['application/pdf'],
});

BillRoute.post('/', fileMiddleware, (...n) => billController.createBill(...n));
BillRoute.put('/:id', (...n) => billController.update(...n));
BillRoute.get('/', (...n) => billController.paginate(...n));
BillRoute.get('/dashboard', (...n) => billController.getDash(...n));
BillRoute.get('/graph', (...n) => billController.getGraphData(...n));
BillRoute.delete('/:id', (...n) => billController.delete(...n));
BillRoute.get('/:id', (...n) => billController.findOne(...n));
BillRoute.get('/all', (...n) => billController.findAll(...n));

export default BillRoute;
