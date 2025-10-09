import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedProduct1759447395111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO products (name, descripcion, stock) VALUES
        ('Lapices normaII', 'Lapices de grafito marca Norma', '12'),
        ('Libretas kiutII', 'Libretas argolladas kiut', '30')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM user WHERE email IN('Lapices normaII', 'Libretas kiutII')`
        )
    }

}