import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({
    type: 'timestamp',
    name: 'email_verified_at',
    nullable: true,
  })
  emailVerifiedAt: Date;

  @Column()
  password: string;

  @Column({ name: 'is_super_admin', default: false })
  isSuperAdmin: boolean;

  @Column({ name: 'is_approved', default: false })
  isApproved: boolean;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  properties: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Subscriber, (subscriber) => subscriber.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: Subscriber;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
