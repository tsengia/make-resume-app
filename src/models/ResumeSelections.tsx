import { makeAutoObservable } from "mobx";

interface IdentitySelections {
    last_name_initial: boolean;
    middle_name_initial: boolean;
}

interface ProfileSelections {
    enabled: boolean;
    entry_uuids: string[];
}

interface ExperienceSelections {
    section_title: string;
    job_description_uuids: string[];
}

class ResumeSelectionsModel {
    identity: IdentitySelections = {
        last_name_initial: false,
        middle_name_initial: true
    }
    
    profile: ProfileSelections = {
        enabled: false,
        entry_uuids: []
    }
    
    experience: ExperienceSelections = {
        section_title: "Technical Experience",
        job_description_uuids: []
    }

    certification_uuids: string[] = []
    software_uuids: string[] = []

    constructor() {
        makeAutoObservable(this);
    }

    load(input: ResumeSelectionsModel) {
        this.certification_uuids = input.certification_uuids;
        this.software_uuids = input.software_uuids;
        this.experience = input.experience;
        this.profile = input.profile;
        this.identity = input.identity;
    }
}

export default ResumeSelectionsModel;