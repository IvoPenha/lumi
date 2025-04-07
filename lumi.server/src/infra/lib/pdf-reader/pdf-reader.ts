import pdfParse from 'pdf-parse';
import * as fs from 'fs';

export class PdfReader {
  async readTextFromPdf(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  async readTextFromPdfBuffer(
    fileBuffer: Buffer<ArrayBufferLike>
  ): Promise<string> {
    const data = await pdfParse(fileBuffer);
    return data.text;
  }
}
