import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseModel } from './basemodel';

export enum PauseType {
  PRODUCTIVE = 'PRODUTIVA',
  IMPPRODUCTIVE = 'IMPRODUTIVA',
}

@Entity({ name: 'call_classification' })
export class CallClassification extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;
}
