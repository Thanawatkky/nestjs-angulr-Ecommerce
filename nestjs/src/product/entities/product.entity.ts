import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    pro_name: string
    @Column()
    pro_detail: string
    @Column()
    pro_price: number
    @Column()
    pro_sale: number
    @Column()
    pro_qty: number
    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category' })
    @Column()
    category: number
    @Column()
    pro_img: string
    @CreateDateColumn()
    create_at: Date
    @UpdateDateColumn()
    update_at: Date

}
