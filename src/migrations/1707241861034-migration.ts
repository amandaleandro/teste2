import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707241861034 implements MigrationInterface {
    name = 'Migration1707241861034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`blacklist\` (\`phone\` int NOT NULL AUTO_INCREMENT, \`reason\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, PRIMARY KEY (\`phone\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`blacklist\``);
    }

}
