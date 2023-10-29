import { Box, Tabs, Tab } from "@mui/material";
import { ReactNode, useState } from "react";

import ResumeModel from "../../models/ResumeModel";
import ViewModel from "../../models/ViewModel";

import IdentityEditor from "./IdentityEditor";
import JobPostingEditor from "./JobPostingEditor";
import EducationEditor from "./EducationEditor";
import ThemeEditor from "./ThemeEditor";
import CertificationEditor from "./CertificationEditor";
import SoftwareEditor from "./SoftwareEditor";
import ExperienceEditor from "./ExperienceEditor";

interface ResumeEditorProps {
    resume: ResumeModel,
    view: ViewModel
}

interface Tab {
    label: string,
    pane: ReactNode
}

function ResumeEditor(props: ResumeEditorProps) {

    let resume = props.resume;
    let view = props.view;

    let [ tab, setTab ] = useState(0);

    let tabs: Tab[] = [
        {label:"Job Posting", pane: <JobPostingEditor view={view} />},
        {label:"Style", pane: <ThemeEditor view={view} />},
        {label:"Identity", pane: <IdentityEditor resume={resume} selections={view.job.selections} />},
        {label:"Education", pane: <EducationEditor resume={resume} selections={view.job.selections} />},
        {label:"Experience", pane:  <ExperienceEditor resume={resume} selections={view.job.selections} />},
        {label:"Software", pane:  <SoftwareEditor resume={resume} selections={view.job.selections} />},
        {label:"Certifications", pane:  <CertificationEditor resume={resume} selections={view.job.selections} />},
        {label:"Projects", pane: <span>Projects</span>}
    ];

    let tabLabels: JSX.Element[] = tabs.map(
        (t: Tab) => {
            return <Tab key={t.label.toLowerCase().replace(" ", "-")} label={t.label} />;
        }
    )

    let selectedTab = tabs[tab].pane;

    return (  
        <Box className="editor" >
            <Tabs value={tab} variant="scrollable" style={{ position: "sticky" }} scrollButtons="auto" onChange={(_, newTab)=>{setTab(newTab)}} >
                {tabLabels}
            </Tabs>
            <Box className="editor-pane" pt={2} pl={2} pr={2} pb={2} >
                {selectedTab}
            </Box>
        </Box>
    );
}

export default ResumeEditor;