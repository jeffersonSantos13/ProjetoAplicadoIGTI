import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPersonalInformation1600613962261
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'height',
        type: 'numeric',
        isNullable: true,
      }),
      new TableColumn({
        name: 'weight',
        type: 'numeric',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
    await queryRunner.dropColumn('users', 'height');
    await queryRunner.dropColumn('users', 'weight');
  }
}
