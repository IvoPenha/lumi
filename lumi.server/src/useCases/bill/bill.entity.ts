import { BaseEntity } from '#/core/base/base.entity';
import { InstallationEntity } from '#/useCases/installations/installations.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('bill')
export class BillEntity extends BaseEntity {
  @Column({ type: 'timestamp', name: 'reference_month' })
  referenceMonth: Date;

  @Column({ type: 'timestamp', name: 'billing_date', nullable: true })
  billingDate: Date | null;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'energy_consumption_kwh',
  })
  energyConsumptionKWh: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'energy_cost' })
  energyCost: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'sceee_energy_cost',
  })
  sceeeEnergyCost: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'compensated_energy_kwh',
  })
  compensatedEnergyKWh: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'compensated_energy_cost',
  })
  compensatedEnergyCost: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'public_lighting_contribution',
  })
  publicLightingContribution: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'total_without_compensation',
  })
  totalWithoutCompensation: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'economy_with_compensation',
  })
  economyWithCompensation: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total' })
  total: number;

  @Column({ type: 'int', name: 'installation_id' })
  installationId: number;

  @ManyToOne(() => InstallationEntity, installation => installation.bills)
  @JoinColumn({ name: 'installation_id' })
  installation: InstallationEntity;
}
