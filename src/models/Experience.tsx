import { makeAutoObservable } from "mobx";
import dayjs, { Dayjs } from "dayjs";
import UUList from "./UniversallyUniqueItem";

class ExperienceModel {
    company: string;
    start_date: Dayjs;
    end_date: Dayjs;
    still_employed: boolean;
    location: string;
    job_title: string;

    // Maps from UUID to string (bullet point)
    description: UUList<string>;

    constructor() {
        this.company = "";
        this.start_date = dayjs();
        this.end_date = dayjs();
        this.still_employed = false;
        this.location = "";
        this.job_title = "";
        this.description = new UUList<string>();
        
        makeAutoObservable(this);
    }

    load(input: ExperienceModel) {
        this.company = input.company;
        this.start_date = dayjs(input.start_date);
        this.end_date = dayjs(input.end_date);
        this.still_employed = input.still_employed;
        this.location = input.location;
        this.job_title = input.job_title;
    
        this.description.load(input.description);
    }
}

export default ExperienceModel;