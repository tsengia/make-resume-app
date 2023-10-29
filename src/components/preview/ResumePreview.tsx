import { PropsWithChildren } from "react";
import ViewModel from "../../models/ViewModel";
import ResumeModel from "../../models/ResumeModel";

import ResumeHeader from "./ResumeHeader";

import { observer } from "mobx-react-lite";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import CertificationsSection from "./CertificationsSection";
import SoftwareSection from "./SoftwareSection";

interface PageProps {
    view: ViewModel,
    resume: ResumeModel
}

const ResumePreview = observer((props: PropsWithChildren<PageProps>) => {

    let theme = props.view.theme;
    let resume = props.resume;

    return (
        <div className="page-container" 
            style = {{
                height: theme.height + "in",
                width: theme.width + "in",
                backgroundColor: theme.background_color,
                fontFamily: theme.font_family,
                fontSize: theme.font_size + "pt",
                marginBottom: "0.5in"
            }}
        >
            <div 
                className="page"
                style={{
                    paddingTop: theme.margin.top + "in",
                    paddingBottom: theme.margin.bottom + "in",
                    paddingLeft: theme.margin.left + "in",
                    paddingRight: theme.margin.right + "in",
                }}
            >
                <ResumeHeader resume={resume} selections={props.view.job.selections} />
                <EducationSection view={props.view} resume={resume} />
                <ExperienceSection view={props.view} resume={resume} selections={props.view.job.selections} />
                <SoftwareSection view={props.view} resume={resume} selections={props.view.job.selections} />
                <CertificationsSection view={props.view} resume={resume} />
            </div>
        </div>
    );
});


export default ResumePreview;