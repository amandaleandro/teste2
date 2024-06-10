import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706194020239 implements MigrationInterface {
    name = 'Migration1706194020239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`record_url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`record_url\``);
    }

}
