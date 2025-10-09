import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;


    @Column({ nullable: false })
    descripcion: string;

    @Column({ nullable: false })
    stock: number;

}
