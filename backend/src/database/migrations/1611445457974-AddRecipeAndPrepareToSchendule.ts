import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddRecipeAndPrepareToSchendule1611445457974
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('schedules', [
      new TableColumn({
        name: 'recipe',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'prepare_mode',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schedules', 'recipe');
    await queryRunner.dropColumn('schedules', 'prepare_mode');
  }
}
