import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string; 
  @Column({ default: 2 })
  user_role: number; 
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'longblob' })
  profile?: Buffer;
  @CreateDateColumn()
  create_at: Date
  @UpdateDateColumn()
  update_at: Date
}