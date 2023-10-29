import { Stack, Button } from "@mui/material";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeModel from "../../models/ResumeModel";
import ResumeSelectionsModel from "../../models/ResumeSelections";
import EducationEntry from "./EducationEntry";
import { ReactNode } from "react";
import EducationModel from "../../models/Education";

interface EducationEditorProps {
    resume: ResumeModel,
    selections: ResumeSelectionsModel
}

const EducationEditor = observer((props: EducationEditorProps) => {

    let entries: ReactNode[] = props.resume.education.map((entry, _1, _2) => {
        return (
            <EducationEntry key={ entry.uuid } entry={entry.value} selections={props.selections} 
                onRemove={()=>props.resume.education.remove(entry.uuid)}
            />
        );
    });

    return (
        <Stack spacing={2} direction="column" >
            {entries}
            <Button variant="contained" onClick={action(()=> {
                props.resume.education.add(new EducationModel())
            })} >Add Education</Button>
        </Stack>
    );
});

export default EducationEditor;