import type { NextFunction, Response, Request } from 'express';
import { BillService } from './bill.service';
import type { BillFileService } from './file/bill.file.service';
import { BaseController } from '#/core/base/base.controller';
import type { BillEntity } from './bill.entity';
import type { BillDashService } from './dash/bill.dash.service';
import { HttpException } from '#/core/exceptions';
import { EMsgError } from '#/core/exceptions/error.enum';

export class BillController extends BaseController<BillEntity> {
  private readonly billService: BillService;

  constructor(
    billService: BillService,
    private readonly billFileService: BillFileService,
    private readonly billDashService: BillDashService
  ) {
    super(billService);
    this.billService = billService;
  }

  async createBill(req: Request, res: Response, _next: NextFunction) {
    const { files } = req; // Extract files from the request

    const extractedData = await this.billFileService.extractTextFromPdf(
      files as Express.Multer.File[]
    ); // Extract text from the PDF file

    const createdBill = await this.billService.create(extractedData);
    res.status(201).json({
      success: true,
      bill: createdBill,
    });
  }

  async getDash(req: Request, res: Response, _next: NextFunction) {
    const dashData = await this.billDashService.getDash();
    if (!dashData) throw new HttpException(400, EMsgError.UNPROCESSABLE_ENTITY);

    res.status(200).json({
      success: true,
      data: dashData,
    });
  }

  async getGraphData(req: Request, res: Response, _next: NextFunction) {
    const { startDate, endDate } = req.query;
    const graphData = await this.billDashService.getGraphData();
    if (!graphData)
      throw new HttpException(400, EMsgError.UNPROCESSABLE_ENTITY);

    res.status(200).json({
      success: true,
      data: graphData,
    });
  }
}
