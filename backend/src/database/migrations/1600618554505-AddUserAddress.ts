import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUserAddress1600618554505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'cep',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'logradouro',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'complemento',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'bairro',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'localidade',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'uf',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cep');
    await queryRunner.dropColumn('users', 'logradouro');
    await queryRunner.dropColumn('users', 'complemento');
    await queryRunner.dropColumn('users', 'bairro');
    await queryRunner.dropColumn('users', 'localidade');
    await queryRunner.dropColumn('users', 'uf');
  }
}
