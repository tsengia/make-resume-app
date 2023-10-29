import { Stack, Button } from "@mui/material";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeModel from "../../models/ResumeModel";
import ResumeSelectionsModel from "../../models/ResumeSelections";

import { ReactNode } from "react";
import ExperienceModel from "../../models/Experience";
import ExperienceEntry from "./ExperienceEntry";

interface ExperienceEditorProps {
    resume: ResumeModel,
    selections: ResumeSelectionsModel
}

const ExperienceEditor = observer((props: ExperienceEditorProps) => {

    let entries: ReactNode[] = props.resume.experience.map((entry, _1, _2) => {
        return(
            <ExperienceEntry key={entry.uuid} entry={entry.value} selections={props.selections} 
                onRemove={action(()=>{props.resume.experience.remove(entry.uuid)})}
            />
        );
    });

    return (
        <Stack spacing={2} direction="column" >
            {entries}
            <Button variant="contained" onClick={action(()=> {
                props.resume.experience.add(new ExperienceModel());
            })} >Add Experience</Button>
        </Stack>
    );
});

export default ExperienceEditor;