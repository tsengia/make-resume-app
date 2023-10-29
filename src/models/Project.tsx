import { makeAutoObservable } from "mobx";
import UUList from "./UniversallyUniqueItem";

class ProjectModel {
    name: string;
    // Maps from UUID to string (bullet point)
    description: UUList<string>;

    constructor() {
        this.name = "";
        this.description = new UUList<string>();
        makeAutoObservable(this);
    }

    load(input: ProjectModel) {
        this.name = input.name;
        this.description.load(input.description);
    }
}

export default ProjectModel;