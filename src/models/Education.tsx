import { makeAutoObservable } from "mobx";
import dayjs, { Dayjs } from "dayjs";

class EducationModel {
    institution: string;
    graduation_date: Dayjs;
    graduated: boolean;
    location: string;
    degree_level: string;
    degree_field: string;
    gpa: string;
    honors: string;

    constructor() {
        this.institution = "";
        this.graduation_date = dayjs();
        this.graduated = false;
        this.location = "";
        this.degree_level = "";
        this.degree_field = "";
        this.gpa = "0.00";
        this.honors = "";

        makeAutoObservable(this);
    }

    load(input: EducationModel) {
        this.institution = input.institution;
        this.graduated = input.graduated;
        this.location = input.location;
        this.degree_field = input.degree_field;
        this.degree_level = input.degree_level;
        this.gpa = input.gpa;
        this.honors = input.honors;
        this.graduation_date = dayjs(input.graduation_date);
    }
}

export default EducationModel;