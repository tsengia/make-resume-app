import JobPosting from "./JobPosting";
import ResumeTheme from "./ResumeTheme";

import { makeObservable, observable, action } from "mobx";

class ViewModel {
    jobs: JobPosting[];
    job: JobPosting;
    themes: ResumeTheme[];
    theme: ResumeTheme;

    /**
     * Produces JSON representation of this object.
     * Transforms the `theme` and `job` fields into the UUID of the selected theme and job
     */
    toJSON(): object {
        return ({
                jobs: this.jobs, 
                themes: this.themes, 
                theme: this.theme.uuid,
                job: this.job.uuid
            });
    }

    addJob(job: JobPosting) {
        this.jobs.push(job);
    }

    removeJob(job: JobPosting) {
        if (this.jobs.length > 1) {
            this.jobs = this.jobs.filter((value: JobPosting, _1: number, _2: any) => {
                return value.uuid == job.uuid;
            });
        }
    }

    selectJob(uuid: string) {
        let selected_job = this.jobs.find((value: JobPosting, _1: number, _2: any) => {
           return value.uuid == uuid;
        });
        if (selected_job) {
            this.job = selected_job;
        }
        else {
            console.error("Failed to find a job in jobs[] with uuid = " + uuid);
        }
    }

    addTheme(theme: ResumeTheme) {
        this.themes.push(theme);
    }

    removeTheme(theme: ResumeTheme) {
        if (this.themes.length > 1) {
            this.themes = this.themes.filter((value: ResumeTheme, _1: number, _2: any) => {
                return value.uuid == theme.uuid;
            });
        }
    }

    selectTheme(uuid: string) {
        let selected_theme = this.themes.find((value: ResumeTheme, _1: number, _2: any) => {
            return value.uuid == uuid;
         });
         if (selected_theme) {
             this.theme = selected_theme;
         }
         else {
             console.error("Failed to find a theme in themes[] with uuid = " + uuid);
         }
    }

    constructor() {
        this.jobs = [];
        this.themes = [];

        this.theme = new ResumeTheme();
        this.job = new JobPosting();

        this.addJob(this.job);
        this.addTheme(this.theme);

        makeObservable(this, {
            jobs: observable,
            themes: observable,
            theme: observable,
            job: observable,
            addJob: action.bound,
            removeJob: action.bound,
            selectJob: action.bound,
            addTheme: action.bound,
            removeTheme: action.bound,
            selectTheme: action.bound
        });
    }

    load(input: ViewModel) {
        this.jobs = [];
        this.themes = [];
        
        for (var i = 0; i < input.jobs.length; i++) {
            let j = new JobPosting();
            j.load(input.jobs[i])
            this.jobs.push(j);
        }

        for (var i = 0; i < input.themes.length; i++) {
            let t = new ResumeTheme();
            t.load(input.themes[i]);
            this.themes.push(t);
        }
        
        this.selectJob((input.job as unknown) as string);
        this.selectTheme((input.theme as unknown) as string);
    }
}

export default ViewModel;