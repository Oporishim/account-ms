import { Package } from 'src/package/entities/package.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscribers')
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column({ nullable: true })
  tagline: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  description: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Index()
  @Column({ unique: true })
  phone: string;

  @Column({ type: 'json', nullable: true })
  address: any;

  @Column({ type: 'json', nullable: true })
  properties: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Package, (pkg) => pkg.subscribers, {
    eager: true,
  })
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @OneToOne(() => User, (user) => user.subscriber)
  user: User;
}
