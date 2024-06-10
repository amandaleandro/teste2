import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706193979102 implements MigrationInterface {
    name = 'Migration1706193979102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`negotiation-call\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`call_id\` varchar(255) NOT NULL, \`classification\` varchar(36) NULL, \`agent\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD CONSTRAINT \`FK_47178168ba8f0cf45fb822a61a5\` FOREIGN KEY (\`classification\`) REFERENCES \`call_classification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` ADD CONSTRAINT \`FK_a302ec58bf35c5db3a4cf57ab54\` FOREIGN KEY (\`agent\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP FOREIGN KEY \`FK_a302ec58bf35c5db3a4cf57ab54\``);
        await queryRunner.query(`ALTER TABLE \`negotiation-call\` DROP FOREIGN KEY \`FK_47178168ba8f0cf45fb822a61a5\``);
        await queryRunner.query(`DROP TABLE \`negotiation-call\``);
    }

}
