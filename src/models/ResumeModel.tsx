import { makeAutoObservable } from "mobx";
import ExperienceModel from "./Experience";
import EducationModel from "./Education";
import ProjectModel from "./Project";
import CertificationModel from "./Certification";
import SoftwareModel from "./Software";
import ProfileModel from "./Profile";
import IdentityModel from "./Identity";
import UUList from "./UniversallyUniqueItem";

class ResumeModel {
    identity: IdentityModel;
    profile: ProfileModel;
    experience: UUList<ExperienceModel>;
    education: UUList<EducationModel>;
    projects: UUList<ProjectModel>;
    certifications: UUList<CertificationModel>;
    software: UUList<SoftwareModel>;

    constructor() {
        this.identity = new IdentityModel();
        this.experience = new UUList<ExperienceModel>();
        this.education = new UUList<EducationModel>();
        this.projects = new UUList<ProjectModel>();
        this.certifications = new UUList<CertificationModel>();
        this.profile = new ProfileModel();
        this.software = new UUList<SoftwareModel>();

        makeAutoObservable(this);
    }

    load(input: ResumeModel) {
        this.identity.load(input.identity);
        this.experience.load(input.experience, ExperienceModel);
        this.education.load(input.education, EducationModel);
        this.projects.load(input.projects, ProjectModel);
        this.certifications.load(input.certifications, CertificationModel);
        this.profile.load(input.profile);
        this.software.load(input.software, SoftwareModel);
    }
}

export default ResumeModel;