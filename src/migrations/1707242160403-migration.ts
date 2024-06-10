import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1707242160403 implements MigrationInterface {
    name = 'Migration1707242160403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blacklist\` CHANGE \`phone\` \`phone\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blacklist\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`blacklist\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`blacklist\` ADD \`phone\` varchar(255) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blacklist\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`blacklist\` ADD \`phone\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`blacklist\` ADD PRIMARY KEY (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`blacklist\` CHANGE \`phone\` \`phone\` int NOT NULL AUTO_INCREMENT`);
    }

}
