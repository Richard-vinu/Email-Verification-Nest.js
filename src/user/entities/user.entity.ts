import { Team } from '../dto/create-user.dto';

import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  employ_id: string;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  DOB: Date;

  @Column()
  team: string;

  @Column({ default: false })
  isDeleted: boolean;

  
  // @Column({nullable:true,type: 'date' })
  // deletedAt:Date;
  @DeleteDateColumn()
  deletedAt:Date

  
}

