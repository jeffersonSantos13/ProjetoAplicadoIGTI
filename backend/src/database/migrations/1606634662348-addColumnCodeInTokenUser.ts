import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumnCodeInTokenUser1606634662348
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('usertokens', [
      new TableColumn({
        name: 'codeToken',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('usertokens', 'codeToken');
  }
}
