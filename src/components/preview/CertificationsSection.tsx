import { observer } from "mobx-react-lite";

import ViewModel from "../../models/ViewModel";
import ResumeModel from "../../models/ResumeModel";
import { ReactNode } from "react";
import CertificationModel from "../../models/Certification";

interface CertificationsProps {
    view: ViewModel,
    resume: ResumeModel
}

const CertificationsSection = observer((props: CertificationsProps) => {

    let entries: ReactNode[] = [];

    for (const entry of props.resume.certifications) {
        if (!entry) {
            break;
        }
        let c: CertificationModel = entry.value;
        let uuid: string = entry.uuid;
        entries.push(
            <div key={ uuid } className="two-column section-container" >
                <div className="left-column" >
                    <p>{ c.name }</p>
                </div>
                <div className="right-column" >
                    <p style={{ display: "block", float: "right" }}>{ c.id }</p>
                </div>
            </div>
        );
    }

    return (
        <div className="section" id="certifications" >
            <h5 className="section-title" style={{ marginTop: 0 }} >Certifications</h5>
            { entries }
        </div>
    );

});

export default CertificationsSection;