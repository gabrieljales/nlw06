import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompliments1647039077130 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'compliments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'user_sender',
            type: 'uuid',
          },
          {
            name: 'user_receiver',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid'
          },
          {
            name: 'message',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [ // Relacionamento (são removidas caso haja um revert na migration)
          {
            name: 'FKUserSenderCompliments',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_sender'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
          {
            name: 'FKUserReceiverCompliments',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_receiver'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
          {
            name: 'FKTagCompliments',
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            columnNames: ['tag_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL'
          },
        ]
      })
    );
    // Outra maneira de criar um relacionamento
    // Não é a melhor forma, se fosse necessário reverter a migration, lá no método down teríamos que remover também as fks

    // await queryRunner.createForeignKey(
    //   'compliments',
    //   new TableForeignKey({
    //     name: 'FKUserSenderCompliments',
    //     referencedTableName: 'users',
    //     referencedColumnNames: ['id'],
    //     columnNames: ['user_sender'],
    //     onDelete: 'SET NULL',
    //     onUpdate: 'SET NULL'
    //   })
    // )
  }


  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('compliments');
  }

}
