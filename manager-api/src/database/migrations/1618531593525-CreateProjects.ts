import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProjects1618531593525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type:"text",
                    },
                    {
                        name: "viability",
                        type: "integer",
                    },
                    {
                        name: "status",
                        type: "interger",
                    },
                    {
                        name: "price",
                        type: "varchar",
                    },
                    {
                        name: "start_date",
                        type: "timestamp"
                    },
                    {
                        name: "expected_finished_date",
                        type: "timestamp",
                    },
                    {
                        name: "finished_date",
                        type: "timestamp",
                        default: null,
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "creator_id",
                        type: "uuid",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["creator_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("projects");
    }

}
