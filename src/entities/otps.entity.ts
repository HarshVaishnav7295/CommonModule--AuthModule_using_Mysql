
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Otps{
    @PrimaryGeneratedColumn('uuid')
    _id : string

    @Column('varchar',{length:6,nullable:true})
    otp : string

    @Column('varchar',{length:50,nullable:false})
    email : string

    @Column('tinyint',{default:0})
    is_deleted : number

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date
}
