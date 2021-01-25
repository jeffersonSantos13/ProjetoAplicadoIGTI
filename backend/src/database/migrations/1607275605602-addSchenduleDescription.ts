import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addSchenduleDescription1607275605602
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('schedules', [
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schedules', 'description');
  }
}
