import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, IsNull, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User)
    @JoinColumn({name: 'ca_user'})
    @Column()
    ca_user: number;
    @ManyToOne(() => Product) 
    @JoinColumn({name: 'ca_product'})
    @Column()
    ca_product: number;
    @Column()
    ca_qty: number;
    @ManyToOne(() => Order)
    @JoinColumn({name: 'ca_order'})
    @Column({ nullable: true })
    ca_order: number; 
    @CreateDateColumn()
    create_at: Date
    @UpdateDateColumn()
    update_at: Date
}
