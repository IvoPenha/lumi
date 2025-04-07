import { tryDate } from '#/core/utils/date.util';
import type { InstallationEntity } from '../installations/installations.entity';
import type {
  BillClientCreateDto,
  BillCreateDto,
  BillInstallationCreateDto,
} from './bill.dto';

function extractReferenceDate(text: string): Date | null {
  const lines = text.split('\n');
  const index = lines.findIndex(line => line.includes('Referente a'));
  if (index === -1 || index + 1 >= lines.length) return null;

  const dataLine = lines[index + 1].trim(); // linha que contém AGO/2024
  const match = dataLine.match(/^([A-Z]{3}\/\d{4})/); // pega só o primeiro campo
  if (!match) return null;

  const [monthStr, yearStr] = match[1].split('/');
  const months = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];
  const month = months.indexOf(monthStr);
  const year = parseInt(yearStr, 10);

  return month !== -1 && !isNaN(year) ? new Date(year, month, 1) : null;
}

export function extractClientAndInstallation(text: string): {
  client?: BillClientCreateDto;
  installation?: BillInstallationCreateDto;
} {
  // Regex para capturar Nº do Cliente e Nº da Instalação
  const numberMatch = text.match(
    /Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d{6,})\s+(\d{6,})/i
  );
  if (!numberMatch) return {};

  const clientNumber = numberMatch[1];
  const installationNumber = numberMatch[2];

  // Capturar o bloco após "ATENÇÃO:" até o documento (CNPJ ou CPF)
  const attentionBlockMatch = text.match(
    /ATENÇÃO:[\s\S]+?(CNPJ|CPF)\s+[\d\.\*\/-]+\s*Nº DO CLIENTE/i
  );
  if (!attentionBlockMatch)
    return {
      client: { number: clientNumber },
      installation: { number: installationNumber },
    };

  const attentionBlock = attentionBlockMatch[0];

  // Capturar o nome (primeira linha após "DÉBITO AUTOMÁTICO")
  const nameMatch = attentionBlock.match(
    /DÉBITO AUTOMÁTICO\s+([A-Z\s]+(?:LTDA)?)/i
  );
  const clientName = nameMatch ? nameMatch[1].trim() : 'Nome não encontrado';

  // Capturar o endereço (bloco entre o nome e o documento, terminando no CEP)
  const addressMatch = attentionBlock.match(
    new RegExp(
      `${clientName}\\s+([\\s\\S]+?)\\s+\\d{5}-\\d{3}\\s+[A-Z\\s]+,\\s+[A-Z]{2}`,
      'i'
    )
  );
  const address = addressMatch
    ? addressMatch[1].replace(/\s+/g, ' ').trim()
    : null;

  // Capturar CNPJ ou CPF (com ou sem máscara)
  const documentMatch = attentionBlock.match(
    /(CNPJ|CPF)\s+(\d{2,3}\.\d{3}\.\d{3}[\/\*]\d{4}-\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\*{4}-\*{2})/i
  );
  const document = documentMatch ? documentMatch[2] : null;

  // Capturar a data de emissão da fatura

  // Montando os objetos de retorno
  const client: BillClientCreateDto = {
    number: clientNumber,
    name: clientName,
    document,
    address,
  };

  const installation: BillInstallationCreateDto = {
    number: installationNumber,
  };

  return { client, installation };
}

export function extractBillData(text: string): BillCreateDto {
  const parseNumber = (input: string): number =>
    parseFloat(input.replace(/\./g, '').replace(',', '.'));

  const match = (regex: RegExp): number => {
    const result = text.match(regex);
    return result ? parseNumber(result[1]) : 0;
  };

  const referenceMonth = extractReferenceDate(text);

  const energyCost = match(/Energia ElétricakWh\s+\d+\s+[\d,]+\s+([\d,]+)/);
  const sceeeEnergyCost = match(
    /Energia SCEE s\/ ICMSkWh\s+\d+\s+[\d,]+\s+([\d,]+)/
  );
  const energyKWh = match(/Energia ElétricakWh\s+(\d+)/);
  const sceeeKWh = match(/Energia SCEE s\/ ICMSkWh\s+(\d+)/);
  const compensatedEnergyKWh = match(/Energia compensada GD IkWh\s+(\d+)/);
  const compensatedEnergyCost = match(
    /Energia compensada GD IkWh\s+\d+\s+[\d,]+\s+-([\d,]+)/
  );
  const publicLightingContribution = match(
    /Contrib Ilum Publica Municipal\s+([\d,]+)/
  );
  const dateMatch = text.match(/Data de emissão:\s+(\d{2}\/\d{2}\/\d{4})/i);
  const billingDate = tryDate(dateMatch?.[1]);

  const totalWithoutCompensation =
    energyCost + sceeeEnergyCost + publicLightingContribution;
  const economyWithCompensation = compensatedEnergyCost;
  const totalMatch = text.match(/Valor a pagar.*?R?\$?\s*(\d+,\d{2})/i);
  const totalValue = totalMatch?.[1]?.replace(',', '.');

  const total = parseFloat(totalValue);

  const { client, installation } = extractClientAndInstallation(text);

  return {
    referenceMonth,
    energyConsumptionKWh: energyKWh + sceeeKWh,
    energyCost,
    sceeeEnergyCost,
    compensatedEnergyKWh,
    compensatedEnergyCost,
    publicLightingContribution,
    totalWithoutCompensation,
    economyWithCompensation,
    billingDate,
    client,
    total,
    installation: installation as BillInstallationCreateDto &
      InstallationEntity,
  };
}
