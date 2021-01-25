import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumFirstLogin1606639818501
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'first_login',
        type: 'boolean',
        isNullable: false,
        default: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'first_login');
  }
}
