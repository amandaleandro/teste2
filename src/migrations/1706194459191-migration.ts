import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706194459191 implements MigrationInterface {
    name = 'Migration1706194459191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`call_id\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`created_by\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`is_archived\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`last_changed_by\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`id\` varchar(255) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`last_changed_by\` varchar(300) NULL`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`is_archived\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`is_active\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`created_by\` varchar(300) NULL`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD \`call_id\` varchar(255) NOT NULL`);
    }

}
