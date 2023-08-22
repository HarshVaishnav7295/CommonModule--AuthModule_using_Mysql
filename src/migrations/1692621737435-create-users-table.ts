import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1692621737435 implements MigrationInterface {
    private table = new Table({
        name: 'users',
        columns: [
          {
            name: '_id',
            type: 'varchar',
            length:"36",
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length : "200",
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'profilePic',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'fb_id',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'google_id',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'apple_id',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'loginType',
            type: 'bit',
            default: 0, // 0-> normal, 1->social
          },
          {
            name: 'isLogedIn',
            type: 'bit',
            default: 0,
          },
          {
            name: 'socketId',
            type: 'text',
            isNullable: true,
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
      })


  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(this.table)
  }
}
