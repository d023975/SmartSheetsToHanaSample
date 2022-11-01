import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum SapYesNo {
  No = '',
  Yes = 'X',
}

@Entity('ENV')
export class Env {
  @Column('nvarchar', {
    primary: true,
    name: 'CLIENT',
    length: 3,

    comment: 'Client',
  })
  client: string;

  @Column('nvarchar', {
    primary: true,
    name: 'ENV_ID',
    length: 3,
    comment: 'Environment',
  })
  envId: string;

  @Column('nvarchar', {
    primary: true,
    name: 'VER',
    length: 4,

    comment: 'Version',
  })
  ver: string;
  @Column('nvarchar', {
    name: 'SEQ',
    length: 7,

    comment: 'Sequence',
  })
  seq: string;
  @Column('nvarchar', {
    name: 'PENV_ID',
    length: 3,
    comment: 'Parent Environment',
  })
  penvId: string;
  @Column('nvarchar', {
    name: 'ENV_TYPE',
    length: 10,

    comment: 'Environment Type',
  })
  envType: string;
  @Column('nvarchar', {
    name: 'ENV_STATE',
    length: 10,

    comment: 'Environment State',
  })
  envState: string;
  @Column('nvarchar', {
    name: 'DBCON',
    length: 30,

    comment: 'Logical name for a database connection',
  })
  dbcon: string;

  @Column('nvarchar', {
    name: 'RFCDEST',
    length: 32,

    comment: 'Logical destination (specified in function call)',
  })
  rfcdest: string;

  @Column('nvarchar', {
    name: 'INFOAREA',
    length: 30,

    comment: 'InfoArea',
  })
  infoarea: string;

  @Column('nvarchar', {
    name: 'BPC_ENVIRONMENT',
    length: 20,

    comment: 'BPC Environment',
  })
  bpcEnvironment: string;

  @Column('nvarchar', {
    name: 'CALLBACK_RFCDEST',
    length: 32,

    comment: 'Callback RFC Destination',
  })
  callbackRfcdest: string;

  @Column('nvarchar', {
    name: 'DESCR',
    length: 255,

    comment: 'Description',
  })
  descr: string;

  @Column('nvarchar', {
    name: 'DOCU',
    length: 255,

    comment: 'Description',
  })
  docu: string;

  @Column('nvarchar', {
    name: 'EXPANDED',
    length: 1,
    default: SapYesNo.No,
    comment: 'Expanded',
  })
  expanded: SapYesNo;

  @Column('nvarchar', {
    name: 'ISLEAF',
    length: 1,
    default: SapYesNo.No,
    comment: 'Is Leaf',
  })
  isLeaf: SapYesNo;

  @Column('nvarchar', {
    name: 'SAMPLE_CONTENT',
    length: 1,

    comment: "Data element for domain BOOLE: TRUE (='X') and FALSE (=' ')",
  })
  sampleContent: string;
}
