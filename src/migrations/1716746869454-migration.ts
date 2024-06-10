import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716746869454 implements MigrationInterface {
    name = 'Migration1716746869454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign\` CHANGE \`agent\` \`agent\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`campaign\` CHANGE \`external_agent_id\` \`external_agent_id\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`campaign\` CHANGE \`external_agent_id\` \`external_agent_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`campaign\` CHANGE \`agent\` \`agent\` varchar(255) NOT NULL`);
    }

}
