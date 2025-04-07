import { HttpException } from '../../../core/exceptions';
import type { PdfReader } from '../../../infra/lib/pdf-reader/pdf-reader';
import type { BillCreateDto } from '../bill.dto';
import { extractBillData } from '../bill.helper';

export class BillFileService {
  constructor(private readonly pdfReader: PdfReader) {}

  async extractTextFromPdf(
    file: Express.Multer.File[]
  ): Promise<BillCreateDto> {
    if (!file?.length) throw new HttpException(400, 'no_file_provided');

    const fileBuffer = file[0]?.buffer;
    console.log('fileBuffer', typeof fileBuffer); // Log the file buffer
    const text = await this.pdfReader.readTextFromPdfBuffer(fileBuffer);

    return extractBillData(text);
  }
}
