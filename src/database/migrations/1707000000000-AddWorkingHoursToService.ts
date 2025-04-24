import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddWorkingHoursToService1707000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'service',
            new TableColumn({
                name: 'workingHours',
                type: 'jsonb',
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('service', 'workingHours');
    }
}
