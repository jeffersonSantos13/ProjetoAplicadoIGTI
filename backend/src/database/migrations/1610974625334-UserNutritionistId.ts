import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UserNutritionistId1610974625334
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'nutritionist_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'nutritionist_id');
  }
}
