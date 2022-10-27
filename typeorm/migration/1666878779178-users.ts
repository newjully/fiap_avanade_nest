import { MigrationInterface, QueryRunner, Table} from "typeorm"
import { idColumn } from "../Utils/idColumn";
import { varcharColumn } from "../Utils/varcharColumn";

export class users1666878779178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                idColumn('id'),
                varcharColumn('name', '100', false),
                varcharColumn('email', '255', false),
                varcharColumn('password', '64', false),
            ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
