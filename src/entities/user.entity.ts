
import {Entity,Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export class Users{
    
    @PrimaryGeneratedColumn('uuid')
    _id : string

    @Column("varchar",{length:100,nullable:false})
    name : string

    @Column("varchar",{length:200,nullable:false,unique:true})
    email : string

    @Column({type:'varchar',nullable:true})
    password : string
    
    @Column({type:'text',nullable:true})
    profile_pic : string

    @Column({type:'text',nullable:true})
    fb_id : string

    @Column({type:'text',nullable:true})
    google_id : string

    @Column({type:'text',nullable:true})
    apple_id : string
    
    @Column({type:'enum',enum:[0,1],default:0}) // 0-> normal, 1->social
    login_type : number

    @Column('tinyint',{default:0})
    is_logedin : number

    @Column("text",{nullable:true})
    socket_id : string

    @Column('tinyint',{default:0})
    is_deleted : number

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date
}

