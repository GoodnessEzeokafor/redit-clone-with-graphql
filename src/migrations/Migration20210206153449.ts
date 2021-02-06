import { Migration } from '@mikro-orm/migrations';

export class Migration20210206153449 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "content" text null;');
  }

}
