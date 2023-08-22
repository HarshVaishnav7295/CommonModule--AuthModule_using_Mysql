import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOtpsTable1692695937452 implements MigrationInterface {
  private table = new Table({
    name: 'otps',
    columns: [
      {
        name: '_id',
        type: 'varchar',
        length: '36',
        isPrimary: true,
        isGenerated: true,
        isNullable: false,
        generationStrategy: 'uuid',
      },
      {
        name: 'otp',
        type: 'varchar',
        length: '6',
        isNullable: true,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '50',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'isDeleted',
        type: 'bit',
        default: 0,
      },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(this.table)
  }
}
