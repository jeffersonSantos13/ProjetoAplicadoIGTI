import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPhotoToSchendule1611530400225
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('schedules', [
      new TableColumn({
        name: 'photo',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schedules', 'photo');
  }
}
