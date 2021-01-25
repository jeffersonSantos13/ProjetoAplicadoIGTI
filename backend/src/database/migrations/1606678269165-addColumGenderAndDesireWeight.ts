import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumGenderAndDesireWeight1606678269165
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'gender',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'desire_weight',
        type: 'numeric',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('gender', 'avatar');
    await queryRunner.dropColumn('desire_weight', 'avatar');
  }
}
