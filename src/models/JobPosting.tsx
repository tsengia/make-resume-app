import { makeAutoObservable } from "mobx";
import dayjs, { Dayjs } from "dayjs"; 

import ResumeSelectionsModel from "./ResumeSelections";

class JobPosting {
    title: string;
    company: string;
    location: string;
    url: string;
    company_page: string;
    description: string;
    date_posted: Dayjs;
    applied_date: Dayjs;
    uuid: string;
    selections: ResumeSelectionsModel;

    constructor() {
        this.title = "Default Job Title";
        this.company = "ACME";
        this.date_posted = dayjs();
        this.description = "";
        this.url = "";
        this.applied_date = dayjs();
        this.company_page = "";
        this.location = "";
        this.selections = new ResumeSelectionsModel();

        // Generate new UUID for this posting
        this.uuid = crypto.randomUUID();
        makeAutoObservable(this);
    }

    load(input: JobPosting) {
        this.uuid = input.uuid;
        this.location = input.location;
        this.company_page = input.company_page;
        this.applied_date = dayjs(input.applied_date);
        this.url = input.url;
        this.description = input.description;
        this.date_posted = dayjs(input.date_posted);
        this.company = input.company;
        this.title = input.title;

        this.selections.load(input.selections);
    }
}

export default JobPosting