import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialSchema1745524376118 implements MigrationInterface {
    name = 'InitialSchema1745524376118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Users table
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: "firstName",
                    type: "varchar"
                },
                {
                    name: "lastName",
                    type: "varchar"
                },
                {
                    name: "phone",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "isActive",
                    type: "boolean",
                    default: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }), true);

        // Service Directions table
        await queryRunner.createTable(new Table({
            name: "service_directions",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true
                }
            ]
        }), true);

        // Services table
        await queryRunner.createTable(new Table({
            name: "services",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "duration",
                    type: "int"
                },
                {
                    name: "directionId",
                    type: "int"
                },
                {
                    name: "isActive",
                    type: "boolean",
                    default: true
                },
                {
                    name: "workingHours",
                    type: "jsonb",
                    isNullable: true
                }
            ]
        }), true);

        // Employees table
        await queryRunner.createTable(new Table({
            name: "employees",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "firstName",
                    type: "varchar"
                },
                {
                    name: "lastName",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "phone",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "position",
                    type: "varchar"
                },
                {
                    name: "isActive",
                    type: "boolean",
                    default: true
                }
            ]
        }), true);

        // Appointments table
        await queryRunner.createTable(new Table({
            name: "appointments",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "userId",
                    type: "int"
                },
                {
                    name: "employeeId",
                    type: "int"
                },
                {
                    name: "serviceId",
                    type: "int"
                },
                {
                    name: "startTime",
                    type: "timestamp"
                },
                {
                    name: "endTime",
                    type: "timestamp"
                },
                {
                    name: "status",
                    type: "varchar"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }), true);

        // Verification Codes table
        await queryRunner.createTable(new Table({
            name: "verification_codes",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "code",
                    type: "varchar"
                },
                {
                    name: "phone",
                    type: "varchar"
                },
                {
                    name: "appointmentId",
                    type: "int"
                },
                {
                    name: "expiresAt",
                    type: "timestamp"
                },
                {
                    name: "isUsed",
                    type: "boolean",
                    default: false
                }
            ]
        }), true);

        // Notifications table
        await queryRunner.createTable(new Table({
            name: "notifications",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "userId",
                    type: "int"
                },
                {
                    name: "type",
                    type: "varchar"
                },
                {
                    name: "message",
                    type: "varchar"
                },
                {
                    name: "isRead",
                    type: "boolean",
                    default: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }), true);

        // Add foreign keys
        await queryRunner.createForeignKey("services", new TableForeignKey({
            columnNames: ["directionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "service_directions",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            columnNames: ["employeeId"],
            referencedColumnNames: ["id"],
            referencedTableName: "employees",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            columnNames: ["serviceId"],
            referencedColumnNames: ["id"],
            referencedTableName: "services",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("verification_codes", new TableForeignKey({
            columnNames: ["appointmentId"],
            referencedColumnNames: ["id"],
            referencedTableName: "appointments",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("notifications", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables in reverse order
        await queryRunner.dropTable("notifications");
        await queryRunner.dropTable("verification_codes");
        await queryRunner.dropTable("appointments");
        await queryRunner.dropTable("employees");
        await queryRunner.dropTable("services");
        await queryRunner.dropTable("service_directions");
        await queryRunner.dropTable("users");
    }
}