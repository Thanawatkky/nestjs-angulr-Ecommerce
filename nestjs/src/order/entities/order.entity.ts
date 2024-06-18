import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User)
    @JoinColumn({ name: "cus_name" })
    @Column()
    cus_name: number
    @Column()
    total_price: number
    @Column({ nullable: true })
    order_status: number
    @CreateDateColumn()
    create_date: Date
    @UpdateDateColumn()
    update_date: Date
}
