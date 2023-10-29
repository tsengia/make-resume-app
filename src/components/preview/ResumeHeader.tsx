import { observer } from "mobx-react-lite";


import ResumeModel from "../../models/ResumeModel";
import ResumeSelectionsModel from "../../models/ResumeSelections";

interface ResumeHeaderProps {
    resume: ResumeModel,
    selections: ResumeSelectionsModel
}

const ResumeHeader = observer((props: ResumeHeaderProps) => {

    let resume = props.resume;
    let selections = props.selections;

    return(
        <div id="resume-header" >
            <div className="two-column" >
                <div className="left-column" >
                    <h1 id="name" >
                        {resume.identity.name.first}&nbsp;
                        {selections.identity.middle_name_initial ? resume.identity.name.middle.substring(0,1) + "." : resume.identity.name.middle }&nbsp;
                        {selections.identity.last_name_initial ? resume.identity.name.last.substring(0,1) + "." : resume.identity.name.last } 
                    </h1>
                    <p id="address" >{resume.identity.address.firstLine} {resume.identity.address.secondLine}</p>
                </div>
                <div className="right-column" >
                    <p id="phone" >{resume.identity.contact.phone}</p>
                    <p id="email" >{resume.identity.contact.email}</p>
                    <p id="github" ><a href={resume.identity.contact.url}>{resume.identity.contact.url}</a></p>
                </div>
            </div>
        </div>
    );
});

export default ResumeHeader;