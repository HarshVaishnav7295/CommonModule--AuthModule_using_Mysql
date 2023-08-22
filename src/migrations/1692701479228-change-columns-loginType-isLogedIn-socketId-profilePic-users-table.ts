import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class ChangeColumnsLoginTypeIsLogedInSocketIdProfilePicUsersTable1692701479228 implements MigrationInterface {
    

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('users','isLogedIn',new TableColumn({
            name : 'is_logedin',
            type : 'tinyint',
            default : 0
        }))
        await queryRunner.changeColumn('users','loginType',new TableColumn({
            name : 'login_type',
            type : 'tinyint',
            default : 0
        }))
        await queryRunner.changeColumn('users','profilePic',new TableColumn({
            name : 'profile_pic',
            type : 'text',
            isNullable : true
        }))
        await queryRunner.changeColumn('users','socketId',new TableColumn({
            name : 'socket_id',
            type : 'text',
            isNullable : true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
