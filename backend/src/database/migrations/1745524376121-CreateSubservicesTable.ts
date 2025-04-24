import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSubservicesTable1745524376121 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'subservices',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'duration',
                        type: 'int',
                    },
                    {
                        name: 'serviceId',
                        type: 'int',
                    },
                    {
                        name: 'isActive',
                        type: 'boolean',
                        default: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'subservices',
            new TableForeignKey({
                columnNames: ['serviceId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'services',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('subservices');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('serviceId') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('subservices', foreignKey);
        }
        await queryRunner.dropTable('subservices');
    }
}