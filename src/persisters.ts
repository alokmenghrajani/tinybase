import {
  ChangedCells,
  ChangedValues,
  Store,
  Tables,
  Values,
} from './types/store.d';
import {DEBUG, ifNotUndefined, isUndefined} from './common/other';
import {
  Persister,
  PersisterListener,
  PersisterStats,
} from './types/persisters.d';
import {EMPTY_STRING} from './common/strings';
import {Id} from './types/common.d';
import {objFreeze} from './common/obj';

export const createCustomPersister = <ListeningHandle>(
  store: Store,
  getPersisted: () => Promise<string | null | undefined>,
  setPersisted: (
    getContent: () => [Tables, Values],
    changedCells?: ChangedCells,
    changedValues?: ChangedValues,
  ) => Promise<void>,
  addPersisterListener: (listener: PersisterListener) => ListeningHandle,
  delPersisterListener: (listeningHandle: ListeningHandle) => void,
): Persister => {
  let listenerId: Id | undefined;
  let loadSave = 0;
  let loads = 0;
  let saves = 0;

  let listening = false;
  let listeningHandle: ListeningHandle | undefined;

  const persister: Persister = {
    load: async (
      initialTables?: Tables,
      initialValues?: Values,
    ): Promise<Persister> => {
      /*! istanbul ignore else */
      if (loadSave != 2) {
        loadSave = 1;
        if (DEBUG) {
          loads++;
        }
        const body = await getPersisted();
        if (!isUndefined(body) && body != EMPTY_STRING) {
          store.setJson(body);
        } else {
          store.setContent([initialTables as Tables, initialValues as Values]);
        }
        loadSave = 0;
      }
      return persister;
    },

    startAutoLoad: async (
      initialTables?: Tables,
      initialValues?: Values,
    ): Promise<Persister> => {
      persister.stopAutoLoad();
      await persister.load(initialTables, initialValues);
      listening = true;
      listeningHandle = addPersisterListener(async (content) => {
        if (isUndefined(content)) {
          await persister.load();
        } else {
          /*! istanbul ignore else */
          if (loadSave != 2) {
            loadSave = 1;
            if (DEBUG) {
              loads++;
            }
            store.setContent(content);
            loadSave = 0;
          }
        }
      });
      return persister;
    },

    stopAutoLoad: (): Persister => {
      if (listening) {
        delPersisterListener(listeningHandle as ListeningHandle);
        listeningHandle = undefined;
        listening = false;
      }
      return persister;
    },

    save: async (
      changedCells?: ChangedCells,
      changedValues?: ChangedValues,
    ): Promise<Persister> => {
      /*! istanbul ignore else */
      if (loadSave != 1) {
        loadSave = 2;
        if (DEBUG) {
          saves++;
        }
        await setPersisted(store.getContent, changedCells, changedValues);
        loadSave = 0;
      }
      return persister;
    },

    startAutoSave: async (): Promise<Persister> => {
      await persister.stopAutoSave().save();
      listenerId = store.addDidFinishTransactionListener((...args) =>
        (persister.save as any)(args[3], args[5]),
      );
      return persister;
    },

    stopAutoSave: (): Persister => {
      ifNotUndefined(listenerId, store.delListener);
      return persister;
    },

    getStore: (): Store => store,

    destroy: (): Persister => persister.stopAutoLoad().stopAutoSave(),

    getStats: (): PersisterStats => (DEBUG ? {loads, saves} : {}),
  };

  return objFreeze(persister);
};
