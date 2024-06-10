import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706190344720 implements MigrationInterface {
    name = 'Migration1706190344720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`call_classification\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_60fdfe809a74279bab8ee994b0\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`operation\` CHANGE \`status\` \`status\` enum ('AVAILABLE', 'PAUSED', 'UNAVAILABLE', 'ON_CALL') NOT NULL DEFAULT 'AVAILABLE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`operation\` CHANGE \`status\` \`status\` enum ('Disponivel', 'Em Pausa', 'Indisponivel', 'Em Ligação') NOT NULL DEFAULT 'Disponivel'`);
        await queryRunner.query(`DROP INDEX \`IDX_60fdfe809a74279bab8ee994b0\` ON \`call_classification\``);
        await queryRunner.query(`DROP TABLE \`call_classification\``);
    }

}
