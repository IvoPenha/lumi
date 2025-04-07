import type { BillRepository } from '../bill.repository';
import type { GetDashParams } from './bill.dash.dto';
import { billDashMapperDto } from './bill.helper';

export class BillDashService {
  constructor(private readonly billRepository: BillRepository) {}

  async getDash(filters: GetDashParams = {}) {
    const query = this.billRepository
      .getRepository()
      .createQueryBuilder('bill');

    query
      .select('SUM(bill.compensated_energy_kwh)', 'totalGeneratedKwh')
      .addSelect('SUM(bill.energy_consumption_kwh)', 'totalConsumedKwh')
      .addSelect(
        `
      CASE 
        WHEN SUM(bill.energy_consumption_kwh) > 0 THEN 
          ROUND(SUM(bill.compensated_energy_kwh) / SUM(bill.energy_consumption_kwh) * 100, 2)
        ELSE 0
      END
    `,
        'compensationPercentage'
      )
      .addSelect('SUM(bill.total)', 'totalCost')
      .addSelect('SUM(bill.economy_with_compensation)', 'totalEconomy');

    // Filtros dinâmicos
    if (filters.customer) {
      query.andWhere('bill.customer = :customer', {
        customer: filters.customer,
      });
    }

    if (filters.startDate) {
      query.andWhere('bill.createdAt >= :startDate', {
        startDate: filters.startDate,
      });
    }

    if (filters.endDate) {
      query.andWhere('bill.createdAt <= :endDate', {
        endDate: filters.endDate,
      });
    }

    if (filters.startEconomy !== undefined) {
      query.andWhere('bill.economy >= :startEconomy', {
        startEconomy: filters.startEconomy,
      });
    }

    if (filters.endEconomy !== undefined) {
      query.andWhere('bill.economy <= :endEconomy', {
        endEconomy: filters.endEconomy,
      });
    }

    if (filters.startEnergyConsumption !== undefined) {
      query.andWhere('bill.energyConsumption >= :startEnergyConsumption', {
        startEnergyConsumption: filters.startEnergyConsumption,
      });
    }

    if (filters.endEnergyConsumption !== undefined) {
      query.andWhere('bill.energyConsumption <= :endEnergyConsumption', {
        endEnergyConsumption: filters.endEnergyConsumption,
      });
    }

    if (filters.startEnergyCost !== undefined) {
      query.andWhere('bill.energyCost >= :startEnergyCost', {
        startEnergyCost: filters.startEnergyCost,
      });
    }

    if (filters.endEnergyCost !== undefined) {
      query.andWhere('bill.energyCost <= :endEnergyCost', {
        endEnergyCost: filters.endEnergyCost,
      });
    }

    if (filters.installationId) {
      query.andWhere('bill.installationId = :installationId', {
        installationId: filters.installationId,
      });
    }

    if (filters.customerId) {
      query.andWhere('bill.customerId = :customerId', {
        customerId: filters.customerId,
      });
    }
    const result = await query.getRawMany();

    return billDashMapperDto(result);
  }

  async getGraphData(filters: GetDashParams = {}) {
    const query = await this.billRepository
      .getRepository()
      .createQueryBuilder('bill')
      .select(`TO_CHAR(bill.reference_month, 'YYYY-MM')`, 'month')
      .addSelect(
        `COALESCE(SUM(bill.compensated_energy_kwh), 0)`,
        'totalGeneratedKwh'
      )
      .addSelect(
        `COALESCE(SUM(bill.energy_consumption_kwh), 0)`,
        'totalConsumedKwh'
      )
      .addSelect(
        `
        CASE 
          WHEN COALESCE(SUM(bill.energy_consumption_kwh), 0) > 0 THEN 
            ROUND(COALESCE(SUM(bill.compensated_energy_kwh), 0) / NULLIF(COALESCE(SUM(bill.energy_consumption_kwh), 0), 0) * 100, 2)
          ELSE 0
        END
      `,
        'compensationPercentage'
      )
      .addSelect(
        `COALESCE(SUM(bill.economy_with_compensation), 0)`,
        'totalEconomy'
      )
      .addSelect(`COALESCE(SUM(bill.total), 0)`, 'totalCost')
      .groupBy(`TO_CHAR(bill.reference_month, 'YYYY-MM')`)
      .orderBy(`TO_CHAR(bill.reference_month, 'YYYY-MM')`, 'ASC');
    return query.getRawMany();
  }
}
