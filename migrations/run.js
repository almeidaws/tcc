const _ = require('underscore');
const { Database } = require('../configs.js');
const { 
    createMigrationTableSQL,
    deleteMigrationTableSQL,
    allMigrationsSQL,
    migrations: migrationsSQLs,
    rollback: migrationsRollbackSQLs
} = require('./database_queries');

const createMigrationTable = async (pool) => {
    await pool.query(createMigrationTableSQL);
};

const rollbackMigrations = async () => {
    const pool = Database.pool();

    for (let i = 0; i < migrationsRollbackSQLs.length; i++) {
        await pool.query(migrationsRollbackSQLs[i]);
    }
    await pool.query(deleteMigrationTableSQL);
    await pool.end();
    console.log('Rollback done');
};

const runMigrations = async () => {
    const pool = Database.pool();
    await createMigrationTable(pool);

    const allMigrationsFromDatabase = async () => (await pool.query(allMigrationsSQL)).rows.map(tuple => ({ version: tuple.version, description: tuple.description }));

    // Retrieve migrations from database
    const result = await pool.query(allMigrationsSQL);
    const ranMigrations = await allMigrationsFromDatabase();
    
    // Check pending migrations
    let pendingMigrationsSQLs = migrationsSQLs;
    ranMigrations.forEach(migration => pendingMigrationsSQLs.splice(0, 1));
    if (migrationsSQLs.length === 0)
        console.log(`No migrations pending`);
    else if (migrationsSQLs.length === 1)
        console.log(`1 migration pending`);
    else
        console.log(`${migrationsSQLs.length} migrations pending`);

    // // Run pending migrations
    for (let i = 0; i < migrationsSQLs.length; i++)
        await pool.query(migrationsSQLs[i]);
     
    // Find just executed migrations and prints it to the user
    const justRanMigrations  = await allMigrationsFromDatabase();
    const contains = (migrations, migration) => _.findWhere(migrations, migration) !== undefined;
    const justExecutedMigrations = justRanMigrations.filter(migration => !contains(ranMigrations, migration));
    justExecutedMigrations.forEach(migration => console.log(`'${migration.description}' v${migration.version} executed`));

    await pool.end();
};

module.exports = { runMigrations, rollbackMigrations };

