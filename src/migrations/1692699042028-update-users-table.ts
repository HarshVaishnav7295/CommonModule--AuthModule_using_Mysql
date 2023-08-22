import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateUsersTable1692699042028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('users','isDeleted',new TableColumn({
            name : 'is_deleted',
            type: 'tinyint',
            default: 0,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
