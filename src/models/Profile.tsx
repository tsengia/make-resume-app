import { makeAutoObservable } from "mobx";
import UUList from "./UniversallyUniqueItem";

class ProfileModel {
    // Maps from UUID to string (bullet point)
    items: UUList<string>

    constructor() {
        this.items = new UUList<string>();

        makeAutoObservable(this);
    }

    load(input: ProfileModel) {
        this.items.load(input.items);
    }
}

export default ProfileModel;