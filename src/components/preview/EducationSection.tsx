import { observer } from "mobx-react-lite";

import ViewModel from "../../models/ViewModel";
import ResumeModel from "../../models/ResumeModel";
import { ReactNode } from "react";
import EducationModel from "../../models/Education";

interface EducationProps {
    view: ViewModel,
    resume: ResumeModel
}

const EducationSection = observer((props: EducationProps) => {

    let entries: ReactNode[] = [];

    for (const entry of props.resume.education) {
        if (!entry) {
            break;
        }
        let e: EducationModel = entry.value;
        let uuid: string = entry.uuid;
        entries.push(
            <div key={ uuid } className="two-column section-container" >
                <div className="left-column" >
                    <p><b>{ e.degree_level.trim() } in { e.degree_field.trim() }</b>{ e.honors.length > 0 ? ", " : "" }<i>{ e.honors.trim() }</i></p>
                    <p>{ e.institution.trim() }{ e.location.length > 0 ? ", " : "" }{ e.location.trim() }</p>
                </div>
                <div className="right-column" >
                    <p style={{ display: "block", float: "right" }}>GPA: { e.gpa }/4.00</p><br />
                    <p style={{ float: "right" }} >{ e.graduation_date.format("MMM. YYYY") }</p>
                </div>
            </div>
        );
    }

    return (
        <div className="section" id="education" >
            <h5 className="section-title" style={{ marginTop: 0 }} >Education</h5>
            { entries }
        </div>
    );

});

export default EducationSection;