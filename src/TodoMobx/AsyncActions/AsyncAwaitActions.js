import { runInAction } from "mobx";

mobx.configure({ enforceActions: true });

class Store {
  @observable githubProjects = []
    @observable state = "pending" // "pending" / "done" / "error"

    @action
    async fetchProjects() {
      this.githubProjects = [];
      this.state = "pending";
      try {
        const projects = await fetchGithubProjectsSomehow();
        const filteredProjects = somePreprocessing(projects);
        // after await, modifying state again, needs an actions:
        runInAction(() => {
          this.state = "done";
          this.githubProjects = filteredProjects
        });
      } catch (error) {
        runInAction(() => {
          this.state = "error";
        });
      }
    }
}