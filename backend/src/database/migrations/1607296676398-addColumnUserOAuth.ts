import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumnUserOAuth1607296676398
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'sub',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'providerId',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'sub');
    await queryRunner.dropColumn('users', 'providerId');
  }
}
