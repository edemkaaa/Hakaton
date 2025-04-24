import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEmployeeServicesTable1745524376120 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "employee_services",
                columns: [
                    {
                        name: "employee_id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "service_id",
                        type: "int",
                        isPrimary: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "employee_services",
            new TableForeignKey({
                columnNames: ["employee_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "employees",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "employee_services",
            new TableForeignKey({
                columnNames: ["service_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "services",
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employee_services");
    }
}