import { TableColumnOptions } from "typeorm";

export const idColumn = (name='Id'): TableColumnOptions => ({
    name,
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
})

// Path: typeorm\Utils\idColumn.ts
// Compare this snippet from typeorm\migration\1666878779178-users.ts:
// import { MigrationInterface, QueryRunner } from "typeorm"
// 
// export class users1666878779178 implements MigrationInterface {
//