import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Token } from '../auth/token.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  handle: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  registrationToken: string | null;

  @Column({ nullable: true })
  loginToken: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
