/// persister-indexed-db

import {Persister} from '../persisters';
import {Store} from '../store';

/// IndexedDbPersister
export interface IndexedDbPersister extends Persister {
  /// IndexedDbPersister.getDbName
  getDbName(): string;
}

/// createIndexedDbPersister
export function createIndexedDbPersister(
  store: Store,
  dbName: string,
  autoLoadIntervalSeconds?: number,
  onIgnoredError?: (error: any) => void,
): IndexedDbPersister;
