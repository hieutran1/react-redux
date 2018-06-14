import { runInAction, flow } from "mobx";

class Store {
  @observable githubProjects = [];
  @observable state = "pending";

  fetchProjects = flow(function * () { // <- note the star, this a generator function!
    this.githubProjects = [];
    this.state = "pending";
    try {
      const projects = yield fetchGithubProjectsSomehow(); // yield instead of await
      const filteredProjects = somePreprocessing(projects);
      // the asynchronous blocks will automatically be wrapped actions and can modify state
      this.state = "done";
      this.githubProjects = filteredProjects;
    } catch (error) {
      this.state = "error";
    }
  });
}