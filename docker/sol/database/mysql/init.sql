DROP USER IF EXISTS 'repl';
CREATE USER 'repl';
GRANT REPLICATION SLAVE, BACKUP_ADMIN ON *.* TO 'repl';

CHANGE REPLICATION SOURCE TO SOURCE_USER='repl' FOR CHANNEL 'group_replication_recovery';

DROP USER IF EXISTS 'auth';
CREATE USER 'auth';
GRANT SELECT, INSERT, UPDATE, DELETE ON auth.* TO 'auth';