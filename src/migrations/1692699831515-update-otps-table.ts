import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateOtpsTable1692699831515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('otps','isDeleted',new TableColumn({
            name : 'is_deleted',
            type: 'tinyint',
            default: 0,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
