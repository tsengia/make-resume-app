import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

import ViewModel from "../../models/ViewModel";
import ResumeModel from "../../models/ResumeModel";
import ExperienceModel from "../../models/Experience";
import ResumeSelectionsModel from "../../models/ResumeSelections";

interface ExperienceProps {
    view: ViewModel,
    resume: ResumeModel,
    selections: ResumeSelectionsModel;
}

const ExperienceSection = observer((props: ExperienceProps) => {

    let entries: ReactNode[] = [];

    for (const entry of props.resume.experience) {
        if (!entry) {
            break;
        }
        let e: ExperienceModel = entry.value;
        let description_items: ReactNode[] = [];
        for (const description of e.description) {
            if (!description) {
                break;
            }

            if (!props.selections.experience.job_description_uuids.includes(description.uuid)) {
                continue;
            }
            
            description_items.push(<li key={description.uuid} >{ description.value }</li>);
        }

        entries.push(
            <div key={ entry.uuid } className="experience-item" >
                <div className="experience-description" >
                    <div className="experience-top" >
                        <p className="title" >{ e.job_title }</p>
                        <p className="duration" >{ e.start_date.format("MMM. YYYY") } - { e.still_employed ? "Present" : e.end_date.format("MMM. YYYY") } </p>
                    </div>
                    <p className="employer" >{e.company}, {e.location}</p>

                    <ul>
                        {description_items}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="section" id="technical-experience" >
            <h5 className="section-title" >Technical Experience</h5>
            <div className="section-container" >
                { entries }
            </div>
        </div>
    );

});

export default ExperienceSection;