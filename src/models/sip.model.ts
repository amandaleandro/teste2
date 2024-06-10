import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sippeers' })
export class Sip {
  @PrimaryColumn({ unique: true })
  name: string;

  @Column({ name: 'context' })
  context: string;

  @Column({ nullable: true, update: false, insert: false })
  accountcode: string;

  @Column({ nullable: true })
  callerid: string;

  @Column({ nullable: true })
  callgroup: string;

  @Column({ nullable: true })
  defaultuser: string;

  @Column({ nullable: true })
  directmedia: string;

  @Column({ nullable: true })
  disallow: string;

  @Column({ nullable: true })
  allow: string;

  @Column({ nullable: false })
  dtmfmode: string;

  @Column({ nullable: true })
  fromuser: string;

  @Column({ nullable: true })
  fullcontact: string;

  @Column({ nullable: true })
  host: string;

  @Column({ nullable: true })
  insecure: string;

  @Column({ nullable: true })
  ipaddr: string;

  @Column({ nullable: true })
  lastms: number;

  @Column({ nullable: true })
  nat: string;

  @Column({ nullable: true })
  pickupgroup: string;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  promiscredir: string;

  @Column({ nullable: true })
  qualify: string;

  @Column({ nullable: true, update: false, insert: false })
  regseconds: number;

  @Column({ nullable: true, update: false, insert: false })
  regserver: string;

  @Column({ nullable: true })
  secret: string;

  @Column({ nullable: true })
  transport: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true, update: false, insert: false })
  useragent: string;

  @Column({ nullable: true, update: false, insert: false })
  amaflags: string;

  @Column({ name: 'call-limit', nullable: true })
  callLimit: number;

  @Column({ nullable: true })
  canreinvite: string;

  @Column({ nullable: true, update: false, insert: false })
  defaultip: string;

  @Column({ nullable: true, update: false, insert: false })
  fromdomain: string;

  @Column({ nullable: true, update: false, insert: false })
  language: string;

  @Column({ nullable: true })
  mailbox: string;

  @Column({ nullable: true })
  deny: string;

  @Column({ nullable: true })
  permit: string;

  @Column({ nullable: true })
  mask: string;

  @Column({ nullable: true })
  musiconhold: string;

  @Column({ nullable: true, update: false, insert: false })
  regexten: string;

  @Column({ nullable: true })
  username: string;
}
