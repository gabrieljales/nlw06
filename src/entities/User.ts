import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string; // Somente a própria entidade pode setar/alterar esse valor

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Exclude() // Excluir as senhas dos retornos
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid(); // Sempre que um usuário for criado, seta um uuid
    }
  }
}

export { User };