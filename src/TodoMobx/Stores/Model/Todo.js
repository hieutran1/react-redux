import { observable, reaction, computed } from "mobx";

export class Todo {
  // unique id of this todo, immutable
  id =  null;

  @observable completed = false;
  @observable task = "";

  // reference to an Author object (from the authorStore)
  @observable author = null;

  store = null;

  /**
   * Indicates whether changes in this object
   * should be submitted to the server
   */
  autoSave = true;

  /**
   * Disposer for the side effect that automatically
   * stores this Todo, see @dispose
   */
  saveHandler = null;

  constructor (store, id=uuid.v4()) {

    this.store = store;
    this.id = id;

    this.saveHandler = reaction(
      // observe everything that is used in the JSON:
      () => this.asJson,
      // if autoSave is on, send json to server
      (json) => {
        if(this.autoSave) {
          this.store.transportLayer.saveTodo(json);
        }
      }
    );
  }

  /**
   * Remove this todo from the client and server
   */
  delete() {
    this.store.transportLayer.deleteTodo(this.is);
    this.store.removeTodo(this);
  }

  @computed get asJson() {
    return {
      id: this.id,
      completed: this.completed,
      task: this.task,
      authorId: this.author ? this.author.id: null
    };
  }

  /**
   * Update this todo with information from the server
   */
  updateFromJson(json) {
    // make sure our changes aren't send back to the server
    this.autoSave = false;
    this.completed = json.completed;
    this.task = json.task;
    this.author = this.store.authorStore.resolveAuthor(json.authorId);
    this.autoSave = true;
  }

  dispose() {
    // clean up the observer
    this.saveHandler();
  }
}