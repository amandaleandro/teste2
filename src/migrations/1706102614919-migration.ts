import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1706102614919 implements MigrationInterface {
  name = 'Migration1706102614919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`operation\` (\`userId\` varchar(255) NOT NULL, \`status\` enum ('Disponivel', 'Em Pausa', 'Indisponivel', 'Em Ligação') NOT NULL DEFAULT 'Disponivel', \`pause\` varchar(255) NULL, \`exten\` varchar(255) NOT NULL, \`logged_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`extens\` (\`name\` varchar(255) NOT NULL, \`secret\` varchar(255) NOT NULL, \`callerid\` varchar(255) NULL, \`protocol\` varchar(255) NOT NULL, \`protocolId\` varchar(255) NOT NULL, \`dialstring\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`name\` varchar(255) NOT NULL, \`login\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`exten_id\` varchar(255) NULL, \`external_id\` varchar(255) NULL, \`properties\` json NULL, \`exten\` varchar(255) NULL, UNIQUE INDEX \`IDX_a62473490b3e4578fd683235c5\` (\`login\`), UNIQUE INDEX \`IDX_1984c74e49e30cce35ba899846\` (\`exten_id\`), UNIQUE INDEX \`REL_4e1491d6b00d3f6cc611d1cad2\` (\`exten\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`lead\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`external_id\` varchar(255) NULL, \`full_name\` varchar(255) NULL, \`photo_uri\` varchar(255) NULL, \`email\` varchar(255) NULL, \`identification\` varchar(255) NOT NULL, \`street_address\` varchar(255) NULL, \`neighborhood\` varchar(255) NULL, \`city\` varchar(255) NULL, \`state\` varchar(255) NULL, \`country\` varchar(255) NULL, \`zip_code\` varchar(255) NULL, \`about\` varchar(255) NULL, \`lastClassification\` varchar(255) NULL, \`last_note\` varchar(255) NULL, \`last_contact_date\` timestamp NOT NULL, \`amount_due\` int NULL, \`amount_over_due\` int NULL, \`contacts\` json NULL, \`scheduled\` tinyint NOT NULL DEFAULT 0, \`preferred_scheduled_time\` datetime NULL, \`preferred_scheduled_day\` varchar(255) NULL, \`agent_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`setting\` (\`name\` varchar(255) NOT NULL, \`value\` json NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`carrier\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`secret\` varchar(255) NOT NULL, \`callerid\` varchar(255) NULL, \`protocol\` varchar(255) NOT NULL, \`host\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`dialstring\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`pause\` (\`id\` varchar(36) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_archived\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(300) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_changed_by\` varchar(300) NULL, \`name\` varchar(255) NOT NULL, \`type\` enum ('PRODUTIVA', 'IMPRODUTIVA') NOT NULL DEFAULT 'PRODUTIVA', UNIQUE INDEX \`IDX_59cd72ff012a176816f98d5388\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sippeers\` (\`name\` varchar(255) NOT NULL, \`context\` varchar(255) NOT NULL, \`accountcode\` varchar(255) NULL, \`callerid\` varchar(255) NULL, \`callgroup\` varchar(255) NULL, \`defaultuser\` varchar(255) NULL, \`directmedia\` varchar(255) NULL, \`disallow\` varchar(255) NULL, \`allow\` varchar(255) NULL, \`dtmfmode\` varchar(255) NOT NULL, \`fromuser\` varchar(255) NULL, \`fullcontact\` varchar(255) NULL, \`host\` varchar(255) NULL, \`insecure\` varchar(255) NULL, \`ipaddr\` varchar(255) NULL, \`lastms\` int NULL, \`nat\` varchar(255) NULL, \`pickupgroup\` varchar(255) NULL, \`port\` int NULL, \`promiscredir\` varchar(255) NULL, \`qualify\` varchar(255) NULL, \`regseconds\` int NULL, \`regserver\` varchar(255) NULL, \`secret\` varchar(255) NULL, \`transport\` varchar(255) NULL, \`type\` varchar(255) NULL, \`useragent\` varchar(255) NULL, \`amaflags\` varchar(255) NULL, \`call-limit\` int NULL, \`canreinvite\` varchar(255) NULL, \`defaultip\` varchar(255) NULL, \`fromdomain\` varchar(255) NULL, \`language\` varchar(255) NULL, \`mailbox\` varchar(255) NULL, \`deny\` varchar(255) NULL, \`permit\` varchar(255) NULL, \`mask\` varchar(255) NULL, \`musiconhold\` varchar(255) NULL, \`regexten\` varchar(255) NULL, \`username\` varchar(255) NULL, PRIMARY KEY (\`name\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_4e1491d6b00d3f6cc611d1cad2b\` FOREIGN KEY (\`exten\`) REFERENCES \`extens\`(\`name\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`lead\` ADD CONSTRAINT \`FK_ccbcf11588080730d11035e330d\` FOREIGN KEY (\`agent_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO \`user\` (id, is_active, is_archived, created_at, created_by, updated_at, last_changed_by, name, login, password, \`role\`, external_id, properties) VALUES('ce1f6b9e-4e6f-4d19-9012-1d5431c3f924', 1, 0, '2024-01-11 22:16:31.774581', 'SYSTEM', '2024-01-18 15:14:40.385129', 'SYSTEM', 'Agente de teste', 'agent@nines.com.br', '$2a$12$eyYco.vfrzJkrLCMQhHHEupu2egVhti0DA5oneoTUmZXvTSoFg5im', 'AGENT', '8ae6b14d-9', NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO \`user\` (id, is_active, is_archived, created_at, created_by, updated_at, last_changed_by, name, login, password, \`role\`, external_id, properties) VALUES('e56d181c-24da-49ed-bbeb-322629d33aac', 1, 0, '2024-01-11 21:44:11.256343', 'SYSTEM', '2024-01-18 15:14:40.476667', 'SYSTEM', 'Admin', 'admin@nines.com.br', '$2a$12$eyYco.vfrzJkrLCMQhHHEupu2egVhti0DA5oneoTUmZXvTSoFg5im', 'SUPER', '8ae6b14d-9', NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`lead\` DROP FOREIGN KEY \`FK_ccbcf11588080730d11035e330d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_4e1491d6b00d3f6cc611d1cad2b\``,
    );
    await queryRunner.query(`DROP TABLE \`sippeers\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_59cd72ff012a176816f98d5388\` ON \`pause\``,
    );
    await queryRunner.query(`DROP TABLE \`pause\``);
    await queryRunner.query(`DROP TABLE \`carrier\``);
    await queryRunner.query(`DROP TABLE \`setting\``);
    await queryRunner.query(`DROP TABLE \`lead\``);
    await queryRunner.query(
      `DROP INDEX \`REL_4e1491d6b00d3f6cc611d1cad2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1984c74e49e30cce35ba899846\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a62473490b3e4578fd683235c5\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`extens\``);
    await queryRunner.query(`DROP TABLE \`operation\``);
  }
}
