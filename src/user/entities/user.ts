import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from 'typeorm';

import UserType from '../enums/userType';
  
  @Entity()
  class User {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @Column({name:"first_name"})
    public firstName: string;

    @Column({name:"last_name"})
    public Lastname: string;

    @Column({
      name:"user_type",
      type: "enum",
      enum: UserType,
      default: UserType.User
    })
    public userType: UserType;

    @Column({name:"uuid",})
    @Generated("uuid")
    uuid: string;

    @CreateDateColumn({name:"created_at",})
    createdAt: Date;
  }
  
  export default User;