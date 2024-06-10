import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711973643830 implements MigrationInterface {
    name = 'Migration1711973643830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`campaign\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`agent\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`customers\` json NULL, \`penalty\` int NOT NULL DEFAULT '0', UNIQUE INDEX \`IDX_e290ca6f46908d64b270de6547\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operation_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`event\` varchar(255) NOT NULL, \`agentId\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`data\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`operation_log\``);
        await queryRunner.query(`DROP INDEX \`IDX_e290ca6f46908d64b270de6547\` ON \`campaign\``);
        await queryRunner.query(`DROP TABLE \`campaign\``);
    }

}
