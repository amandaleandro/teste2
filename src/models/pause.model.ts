import { Column, Entity } from 'typeorm';

import { BaseModel } from './basemodel';

export enum PauseType {
  PRODUCTIVE = 'PRODUTIVA',
  IMPPRODUCTIVE = 'IMPRODUTIVA',
}

@Entity({ name: 'pause' })
export class Pause extends BaseModel {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: PauseType,
    default: PauseType.PRODUCTIVE,
  })
  type: PauseType;
}
