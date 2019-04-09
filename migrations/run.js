const _ = require('underscore');
const { Database } = require('../configs.js');
const pool = Database.pool();
const { createMigrationTableSQL, allMigrationsSQL, migrations: migrationsSQLs } = require('./database_queries');

const createMigrationTable = async () => {
    await pool.query(createMigrationTableSQL);
};

const runMigrations = async () => {
    const allMigrationsFromDatabase = async () => (await pool.query(allMigrationsSQL)).rows.map(tuple => ({ version: tuple.version, description: tuple.description }));

    // Retrieve migrations from database
    const result = await pool.query(allMigrationsSQL);
    const ranMigrations = await allMigrationsFromDatabase();
    
    // Check pending migrations
    let pendingMigrationsSQLs = migrationsSQLs;
    ranMigrations.forEach(migration => pendingMigrationsSQLs = pendingMigrationsSQLs.splice(0, 1));
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
    justExecutedMigrations.forEach(migration => console.log(`'${migration.description}' v${migration.version} executed'`));
};

const run = async () => { await createMigrationTable(); await runMigrations(); };

module.exports = run;

