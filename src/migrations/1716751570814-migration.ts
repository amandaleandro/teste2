import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716751570814 implements MigrationInterface {
    name = 'Migration1716751570814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`operation_log\` CHANGE \`event\` \`event\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`operation_log\` CHANGE \`event\` \`event\` varchar(255) NOT NULL`);
    }

}
