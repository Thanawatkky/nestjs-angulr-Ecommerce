import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    c_name: string;
    @Column()
    description: string
    @CreateDateColumn()
    create_at: Date
    @UpdateDateColumn()
    update_at: Date
}
