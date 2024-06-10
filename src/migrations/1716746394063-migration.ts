import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1716746394063 implements MigrationInterface {
  name = 'Migration1716746394063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`queue_call\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_f0c1a961fa68c36ac875eb0afd\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wallet\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`agent\` varchar(255) NOT NULL, \`customers\` json NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` ADD \`external_agent_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`negotiation-call\` CHANGE \`record_url\` \`record_url\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`negotiation-call\` CHANGE \`record_url\` \`record_url\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`campaign\` DROP COLUMN \`external_agent_id\``,
    );
    await queryRunner.query(`DROP TABLE \`wallet\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f0c1a961fa68c36ac875eb0afd\` ON \`queue_call\``,
    );
    await queryRunner.query(`DROP TABLE \`queue_call\``);
  }
}
