/**
 * The persisters module of the TinyBase project provides a simple framework for
 * saving and loading Store data, to and from different destinations, or
 * underlying storage types.
 *
 * Several entry points are provided (in separately installed modules), each of
 * which returns a new Persister object that can load and save a Store:
 *
 * - The createSessionPersister function (in the persister-browser module)
 *   returns a Persister that uses the browser's session storage.
 * - The createLocalPersister function (in the persister-browser module) returns
 *   a Persister that uses the browser's local storage.
 * - The createRemotePersister function (in the persister-remote module) returns
 *   a Persister that uses a remote server.
 * - The createFilePersister function (in the persister-file module) returns a
 *   Persister that uses a local file (in an appropriate environment).
 *
 * Since persistence requirements can be different for every app, the
 * createCustomPersister function in this module can also be used to easily
 * create a fully customized way to save and load Store data.
 *
 * @see Persisting Data guide
 * @see Countries demo
 * @see Todo App demos
 * @see Drawing demo
 * @packageDocumentation
 * @module persisters
 */
/// persisters
/**
 * The PersisterStats type describes the number of times a Persister object has
 * loaded or saved data.
 *
 * A PersisterStats object is returned from the getStats method, and is only
 * populated in a debug build.
 *
 * @category Development
 */
/// PersisterStats
{
  /**
   * The number of times data has been loaded.
   */
  /// PersisterStats.loads
  /**
   * The number of times data has been saved.
   */
  /// PersisterStats.saves
}
/**
 * A PersisterListener is a callback that lets a Persister inform the Store that
 * a change has happened to the underlying data.
 *
 * If the listener has the `getTransactionChanges` parameter, it will be used to
 * make an incremental change to the Store. If not, but the `getContent`
 * function _is_ available, that will be used to make a wholesale change to the
 * Store. If neither are present, the content will be loaded from the
 * Persister's load method.
 *
 * @param getContent An optional function that, if provided, returns an array of
 * Store content and can be used to immediately wholesale update the Store.
 * @param getTransactionChanges An optional function that, if provided, returns
 * a TransactionChanges object and can be used to immediately incrementally
 * update the Store.
 */
/// PersisterListener
/**
 * A Persister object lets you save and load Store data to and from different
 * locations, or underlying storage types.
 *
 * This is useful for preserving Store data between browser sessions or reloads,
 * saving or loading browser state to or from a server, or saving Store data to
 * disk in a environment with filesystem access.
 *
 * Creating a Persister depends on the choice of underlying storage where the
 * data is to be stored. Options include the createSessionPersister function,
 * the createLocalPersister, the createRemotePersister function, and the
 * createFilePersister function. The createCustomPersister function can also be
 * used to easily create a fully customized way to save and load Store data.
 *
 * A Persister lets you explicit save or load data, with the save method and the
 * load method respectively. These methods are both asynchronous (since the
 * underlying data storage may also be) and return promises. As a result you
 * should use the `await` keyword to call them in a way that guarantees
 * subsequent execution order.
 *
 * When you don't want to deal with explicit persistence operations, a Persister
 * object also provides automatic saving and loading. Automatic saving listens
 * for changes to the Store and persists the data immediately. Automatic loading
 * listens (or polls) for changes to the persisted data and reflects those
 * changes in the Store.
 *
 * You can start automatic saving or loading with the startAutoSave method and
 * startAutoLoad method. Both are asynchronous since they will do an immediate
 * save and load before starting to listen for subsequent changes. You can stop
 * the behavior with the stopAutoSave method and stopAutoLoad method (which are
 * synchronous).
 *
 * You may often want to have both automatic saving and loading of a Store so
 * that changes are constantly synchronized (allowing basic state preservation
 * between browser tabs, for example). The framework has some basic provisions
 * to prevent race conditions - for example it will not attempt to save data if
 * it is currently loading it and vice-versa.
 *
 * Be aware, however, that the default implementations do not provide complex
 * synchronization heuristics and you should comprehensively test your
 * persistence strategy to understand the opportunity for data loss (in the case
 * of trying to save data to a server under poor network conditions, for
 * example).
 *
 * @example
 * This example creates a Store, persists it to the browser's session storage as
 * a JSON string, changes the persisted data, updates the Store from it, and
 * finally destroys the Persister again.
 *
 * ```js
 * const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
 * const persister = createSessionPersister(store, 'pets');
 *
 * await persister.save();
 * console.log(sessionStorage.getItem('pets'));
 * // -> '[{"pets":{"fido":{"species":"dog"}}},{}]'
 *
 * sessionStorage.setItem('pets', '[{"pets":{"toto":{"species":"dog"}}},{}]');
 * await persister.load();
 * console.log(store.getTables());
 * // -> {pets: {toto: {species: 'dog'}}}
 *
 * persister.destroy();
 * sessionStorage.clear();
 * ```
 * @example
 * This example creates a Store, and automatically saves and loads it to the
 * browser's session storage as a JSON string. Changes to the Store data, or the
 * persisted data (implicitly firing a StorageEvent), are reflected accordingly.
 *
 * ```js
 * const store = createStore();
 * const persister = createSessionPersister(store, 'pets');
 *
 * await persister.startAutoLoad({pets: {fido: {species: 'dog'}}});
 * await persister.startAutoSave();
 *
 * store.setTables({pets: {felix: {species: 'cat'}}});
 * // ...
 * console.log(sessionStorage.getItem('pets'));
 * // -> '[{"pets":{"felix":{"species":"cat"}}},{}]'
 *
 * // In another browser tab:
 * sessionStorage.setItem('pets', '[{"pets":{"toto":{"species":"dog"}}},{}]');
 * // -> StorageEvent('storage', {storageArea: sessionStorage, key: 'pets'})
 *
 * // ...
 * console.log(store.getTables());
 * // -> {pets: {toto: {species: 'dog'}}}
 *
 * persister.destroy();
 * sessionStorage.clear();
 * ```
 * @category Persister
 */
/// Persister
{
  /**
   * The load method gets persisted data from storage, and loads it into the
   * Store with which the Persister is associated, once.
   *
   * The optional parameter allows you to specify what the initial Tables object
   * for the Store will be if there is nothing currently persisted. Using this
   * instead of the `initialTables` parameter in the regular createStore
   * function allows you to easily instantiate a Store whether it's loading from
   * previously persisted storage or being run for the first time.
   *
   * This method is asynchronous because the persisted data may be on a remote
   * machine or a filesystem. Even for those storage types that are synchronous
   * (like browser storage) it is still recommended that you `await` calls to
   * this method or handle the return type natively as a Promise.
   *
   * @param initialTables An optional Tables object used when the underlying
   * storage has not previously been populated.
   * @param initialValues An optional Values object used when the underlying
   * storage has not previously been populated, since v3.0.0.
   * @returns A Promise containing a reference to the Persister object.
   * @example
   * This example creates an empty Store, and loads data into it from the
   * browser's session storage, which for the purposes of this example has been
   * previously populated.
   *
   * ```js
   * sessionStorage.setItem('pets', '[{"pets":{"fido":{"species":"dog"}}},{}]');
   *
   * const store = createStore();
   * const persister = createSessionPersister(store, 'pets');
   *
   * await persister.load();
   * console.log(store.getTables());
   * // -> {pets: {fido: {species: 'dog'}}}
   *
   * sessionStorage.clear();
   * ```
   * @example
   * This example creates an empty Store, and loads data into it from the
   * browser's session storage, which is at first empty, so the optional
   * parameter is used. The second time the load method is called, data has
   * previously been persisted and instead, that is loaded.
   *
   * ```js
   * const store = createStore();
   * const persister = createSessionPersister(store, 'pets');
   *
   * await persister.load({pets: {fido: {species: 'dog'}}});
   * console.log(store.getTables());
   * // -> {pets: {fido: {species: 'dog'}}}
   *
   * sessionStorage.setItem('pets', '[{"pets":{"toto":{"species":"dog"}}},{}]');
   * await persister.load({pets: {fido: {species: 'dog'}}});
   * console.log(store.getTables());
   * // -> {pets: {toto: {species: 'dog'}}}
   *
   * sessionStorage.clear();
   * ```
   * @category Load
   */
  /// Persister.load
  /**
   * The startAutoLoad method gets persisted data from storage, and loads it
   * into the Store with which the Persister is associated, once, and then
   * continuously.
   *
   * The optional parameter allows you to specify what the initial Tables object
   * for the Store will be if there is nothing at first persisted. Using this
   * instead of the `initialTables` parameter in the regular createStore
   * function allows you to easily instantiate a Store whether it's loading from
   * previously persisted storage or being run for the first time.
   *
   * This method first runs a single call to the load method to ensure the data
   * is in sync with the persisted storage. It then continues to watch for
   * changes to the underlying data (either through events or polling, depending
   * on the storage type), automatically loading the data into the Store.
   *
   * This method is asynchronous because it starts by making a single call to
   * the asynchronous load method. Even for those storage types that are
   * synchronous (like browser storage) it is still recommended that you `await`
   * calls to this method or handle the return type natively as a Promise.
   *
   * @param initialTables An optional Tables object used when the underlying
   * storage has not previously been populated.
   * @param initialValues An optional Values object used when the underlying
   * storage has not previously been populated, since v3.0.0.
   * @returns A Promise containing a reference to the Persister object.
   * @example
   * This example creates an empty Store, and loads data into it from the
   * browser's session storage, which at first is empty (so the `initialTables`
   * parameter is used). Subsequent changes to the underlying storage are then
   * reflected in the Store (in this case through detection of StorageEvents
   * from session storage changes made in another browser tab).
   *
   * ```js
   * const store = createStore();
   * const persister = createSessionPersister(store, 'pets');
   *
   * await persister.startAutoLoad({pets: {fido: {species: 'dog'}}});
   * console.log(store.getTables());
   * // -> {pets: {fido: {species: 'dog'}}}
   *
   * // In another browser tab:
   * sessionStorage.setItem('pets', '[{"pets":{"toto":{"species":"dog"}}},{}]');
   * // -> StorageEvent('storage', {storageArea: sessionStorage, key: 'pets'})
   *
   * // ...
   * console.log(store.getTables());
   * // -> {pets: {toto: {species: 'dog'}}}
   *
   * persister.destroy();
   * sessionStorage.clear();
   * ```
   * @category Load
   */
  /// Persister.startAutoLoad
  /**
   * The stopAutoLoad method stops the automatic loading of data from storage
   * previously started with the startAutoLoad method.
   *
   * If the Persister is not currently set to automatically load, this method
   * has no effect.
   *
   * @returns A reference to the Persister object.
   * @example
   * This example creates an empty Store, and starts automatically loading data
   * into it from the browser's session storage. Once the automatic loading is
   * stopped, subsequent changes are not reflected in the Store.
   *
   * ```js
   * const store = createStore();
   * const persister = createSessionPersister(store, 'pets');
   * await persister.startAutoLoad();
   *
   * // In another browser tab:
   * sessionStorage.setItem('pets', '[{"pets":{"toto":{"species":"dog"}}},{}]');
   * // -> StorageEvent('storage', {storageArea: sessionStorage, key: 'pets'})
   * // ...
   * console.log(store.getTables());
   * // -> {pets: {toto: {species: 'dog'}}}
   *
   * persister.stopAutoLoad();
   *
   * // In another browser tab:
   * sessionStorage.setItem(
   *   'pets',
   *   '[{"pets":{"felix":{"species":"cat"}}},{}]',
   * );
   * // -> StorageEvent('storage', {storageArea: sessionStorage, key: 'pets'})
   * // ...
   * console.log(store.getTables());
   * // -> {pets: {toto: {species: 'dog'}}}
   * // Storage change has not been automatically loaded.
   *
   * persister.destroy();
   * sessionStorage.clear();
   * ```
   * @category Load
   */
  /// Persister.stopAutoLoad
  /**
   * The save method takes data from the Store with which the Persister is
   * associated and persists it into storage, once.
   *
   * This method is asynchronous because the persisted data may be on a remote
   * machine or a filesystem. Even for those storage types that are synchronous
   * (like browser storage) it is still recommended that you `await` calls to
   * this method or handle the return type natively as a Promise.
   *
   * @returns A Promise containing a reference to the Persister object.
   * @example
   * This example creates a Store with some data, and saves into the browser's
   * session storage.
   *
   * ```js
   * const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
   * const persister = createSessionPersister(store, 'pets');
   *
   * await persister.save();
   * console.log(sessionStorage.getItem('pets'));
   * // -> '[{"pets":{"fido":{"species":"dog"}}},{}]'
   *
   * persister.destroy();
   * sessionStorage.clear();
   * ```
   * @category Save
   */
  /// Persister.save
  /**
   * The save method takes data from the Store with which the Persister is
   * associated and persists it into storage, once, and then continuously.
   *
   * This method first runs a single call to the save method to ensure the data
   * is in sync with the persisted storage. It then continues to watch for
   * changes to the Store, automatically saving the data to storage.
   *
   * This method is asynchronous because it starts by making a single call to
   * the asynchronous save method. Even for those storage types that are
   * synchronous (like browser storage) it is still recommended that you `await`
   * calls to this method or handle the return type natively as a Promise.
   *
   * @returns A Promise containing a reference to the Persister object.
   * @example
   * This example creates a Store with some data, and saves into the browser's
   * session storage. Subsequent changes to the Store are then automatically
   * saved to the underlying storage.
   *
   * ```js
   * const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
   * const persister = createSessionPersister(store, 'pets');
   *
   * await persister.startAutoSave();
   * console.log(sessionStorage.getItem('pets'));
   * // -> '[{"pets":{"fido":{"species":"dog"}}},{}]'
   *
   * store.setTables({pets: {toto: {species: 'dog'}}});
   * // ...
   * console.log(sessionStorage.getItem('pets'));
   * // -> '[{"pets":{"toto":{"species":"dog"}}},{}]'
   *
   * sessionStorage.clear();
   * ```
   * @category Save
   */
  /// Persister.startAutoSave
  /**
   * The stopAutoSave method stops the automatic save of data to storage
   * previously started with the startAutoSave method.
   *
   * If the Persister is not currently set to automatically save, this method
   * has no effect.
   *
   * @returns A reference to the Persister object.
   * @example
   * This example creates a Store with some data, and saves into the browser's
   * session storage. Subsequent changes to the Store are then automatically
   * saved to the underlying storage. Once the automatic saving is
   * stopped, subsequent changes are not reflected.
   *
   * ```js
   * const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
   * const persister = createSessionPersister(store, 'pets');
   * await persister.startAutoSave();
   *
   * store.setTables({pets: {toto: {species: 'dog'}}});
   * // ...
   * console.log(sessionStorage.getItem('pets'));
   * // -> '[{"pets":{"toto":{"species":"dog"}}},{}]'
   *
   * persister.stopAutoSave();
   *
   * store.setTables({pets: {felix: {species: 'cat'}}});
   * // ...
   * console.log(sessionStorage.getItem('pets'));
   * // -> '[{"pets":{"toto":{"species":"dog"}}},{}]'
   * // Store change has not been automatically saved.
   *
   * sessionStorage.clear();
   * ```
   * @category Save
   */
  /// Persister.stopAutoSave
  /**
   * The getStore method returns a reference to the underlying Store that is
   * backing this Persister object.
   *
   * @returns A reference to the Store.
   * @example
   * This example creates a Persister object against a newly-created Store and
   * then gets its reference in order to update its data.
   *
   * ```js
   * const persister = createSessionPersister(createStore(), 'pets');
   * await persister.startAutoSave();
   *
   * persister.getStore().setTables({pets: {fido: {species: 'dog'}}});
   * // ...
   * console.log(sessionStorage.getItem('pets'));
   * // -> '[{"pets":{"fido":{"species":"dog"}}},{}]'
   *
   * sessionStorage.clear();
   * ```
   * @category Getter
   */
  /// Persister.getStore
  /**
   * The destroy method should be called when this Persister object is no longer
   * used.
   *
   * This guarantees that all of the listeners that the object registered with
   * the underlying Store and storage are removed and it can be correctly
   * garbage collected. It is equivalent to running the stopAutoLoad method and
   * the stopAutoSave method in succession.
   *
   * @example
   * This example creates a Store, associates a Persister object with it (that
   * registers a TablesListener with the underlying Store), and then destroys it
   * again, removing the listener.
   *
   * ```js
   * const store = createStore();
   * const persister = createSessionPersister(store, 'pets');
   * await persister.startAutoSave();
   *
   * console.log(store.getListenerStats().transaction);
   * // -> 1
   *
   * persister.destroy();
   *
   * console.log(store.getListenerStats().transaction);
   * // -> 0
   * ```
   * @category Lifecycle
   */
  /// Persister.destroy
  /**
   * The getStats method provides a set of statistics about the Persister, and
   * is used for debugging purposes.
   *
   * The PersisterStats object contains a count of the number of times the
   * Persister has loaded and saved data.
   *
   * The statistics are only populated in a debug build: production builds
   * return an empty object. The method is intended to be used during
   * development to ensure your persistence layer is acting as expected, for
   * example.
   *
   * @returns A PersisterStats object containing Persister load and save
   * statistics.
   * @example
   * This example gets the load and save statistics of a Persister object.
   * Remember that the startAutoLoad method invokes an explicit load when it
   * starts, and the startAutoSave method invokes an explicit save when it
   * starts - so those numbers are included in addition to the loads and saves
   * invoked by changes to the Store and to the underlying storage.
   *
   * ```js
   * const store = createStore();
   * const persister = createSessionPersister(store, 'pets');
   *
   * await persister.startAutoLoad({pets: {fido: {species: 'dog'}}});
   * await persister.startAutoSave();
   *
   * store.setTables({pets: {felix: {species: 'cat'}}});
   * // ...
   *
   * sessionStorage.setItem('pets', '[{"pets":{"toto":{"species":"dog"}}},{}]');
   * // -> StorageEvent('storage', {storageArea: sessionStorage, key: 'pets'})
   * // ...
   *
   * console.log(persister.getStats());
   * // -> {loads: 2, saves: 2}
   *
   * persister.destroy();
   * sessionStorage.clear();
   * ```
   * @category Development
   */
  /// Persister.getStats
}
/**
 * The createCustomPersister function creates a Persister object that you can
 * configure to persist the Store in any way you wish.
 *
 * As well as providing a reference to the Store to persist, you must provide
 * functions that handle how to fetch, write, and listen to, the persistence
 * layer.
 *
 * The other creation functions (such as the createSessionPersister function and
 * createFilePersister function, for example) all use this function under the
 * covers. See those implementations for ideas on how to implement your own
 * Persister types.
 *
 * This API changed in v4.0.0. Any custom persisters created on previous
 * versions should be upgraded. Most notably, the `setPersisted` function
 * parameter is provided with a `getContent` function to get the content from
 * the Store itself, rather than being passed pre-serialized JSON. It also
 * receives information about the changes made during a transaction. The
 * `getPersisted` function must return the content (or nothing) rather than
 * JSON. `addPersisterListener` has been renamed `addPersisterListener`, and
 * `addPersisterListener` has been renamed `delPersisterListener`.
 *
 * @param store The Store to persist.
 * @param getPersisted An asynchronous function which will fetch content from
 * the persistence layer (or `undefined` if not present).
 * @param setPersisted An asynchronous function which will send content to the
 * persistence layer. Since v4.0.0, it receives functions for getting the Store
 * content and information about the changes made during a transaction.
 * @param addPersisterListener A function that will register a `listener`
 * listener on underlying changes to the persistence layer. You can return a
 * listening handle that will be provided again when `delPersisterListener` is
 * called.
 * @param delPersisterListener A function that will unregister the listener from
 * the underlying changes to the persistence layer. It receives whatever was
 * returned from your `addPersisterListener` implementation.
 * @returns A reference to the new Persister object.
 * @example
 * This example creates a custom Persister object and persists the Store to a
 * local string called `storeJson` and which would automatically load by polling
 * for changes every second.
 *
 * ```js
 * const store = createStore().setTables({pets: {fido: {species: 'dog'}}});
 * let storeJson;
 *
 * const persister = createCustomPersister(
 *   store,
 *   async () => {
 *     try {
 *       return JSON.parse(storeJson);
 *     } catch {}
 *   },
 *   async (getContent) => (storeJson = JSON.stringify(getContent())),
 *   (listener) => setInterval(listener, 1000),
 *   (interval) => clearInterval(interval),
 * );
 *
 * await persister.save();
 * console.log(storeJson);
 * // -> '[{"pets":{"fido":{"species":"dog"}}},{}]'
 *
 * storeJson = '[{"pets":{"fido":{"species":"dog","color":"brown"}}},{}]';
 * await persister.load();
 *
 * console.log(store.getTables());
 * // -> {pets: {fido: {species: 'dog', color: 'brown'}}}
 *
 * persister.destroy();
 * ```
 * @category Creation
 */
/// createCustomPersister
