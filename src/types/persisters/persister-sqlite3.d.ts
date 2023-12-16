/// persister-sqlite3

import {DatabasePersisterConfig, Persister} from '../persisters';
import {Database} from 'sqlite3';
import {Store} from '../store';

/// Sqlite3Persister
export interface Sqlite3Persister extends Persister {
  /// Sqlite3Persister.getDb
  getDb(): Database;
}

/// createSqlite3Persister
export function createSqlite3Persister(
  store: Store,
  db: Database,
  configOrStoreTableName?: DatabasePersisterConfig | string,
  onSqlCommand?: (sql: string, args?: any[]) => void,
  onIgnoredError?: (error: any) => void,
): Sqlite3Persister;
