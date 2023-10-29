import { observer } from "mobx-react-lite";

import ViewModel from "../../models/ViewModel";
import ResumeModel from "../../models/ResumeModel";
import ResumeSelections from "../../models/ResumeSelections";

interface SoftwareProps {
    view: ViewModel,
    resume: ResumeModel,
    selections: ResumeSelections
}

const SoftwareSection = observer((props: SoftwareProps) => {

    let entry_list: string = ""

    props.resume.software.data.forEach((item, _1, _2) => {
        let uuid = item.uuid;
        if (!props.selections.software_uuids.includes(uuid)) {
            // Skip this entry if it is not selected for this job posting
            return;
        }

        let s = item.value;
        entry_list += s.name + ", ";
    });

    if (entry_list.length > 1) {
        entry_list = entry_list.substring(0,entry_list.length - 2);
    }

    return (
        <div className="section" id="software" >
            <h5 className="section-title" style={{ marginTop: 0 }} >Software Skills</h5>
            <div className="two-column section-container"> 
                { entry_list }
            </div>
        </div>
    );

});

export default SoftwareSection;