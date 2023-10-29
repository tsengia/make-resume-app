import { makeAutoObservable } from "mobx";

export default class SoftwareModel {
    name: string;
    category: string;

    constructor() {
        this.name = "";
        this.category = "";

        makeAutoObservable(this);
    }

    load(input: SoftwareModel) {
        this.category = input.category;
        this.name = input.name;
    }

}