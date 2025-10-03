import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Creamos la entidad
@Entity()
export class User {
    // Con esto indicamos que es una primary key
    @PrimaryGeneratedColumn()
    id: number;

    // Indicamos que es una columna 
    @Column({nullable: false}) // 'nullable: false' el dato no puede ser nulo (Estar vacio)
    name: string;

    @Column({nullable: false, unique:true}) // ' unique:true' el dato debe ser unico
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    age?: number;

}