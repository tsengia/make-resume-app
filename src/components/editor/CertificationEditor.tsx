import { Stack, Button } from "@mui/material";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeModel from "../../models/ResumeModel";
import ResumeSelectionsModel from "../../models/ResumeSelections";

import { ReactNode } from "react";
import CertificationModel from "../../models/Certification";
import CertificationEntry from "./CertificationEntry";

interface CertificationEditorProps {
    resume: ResumeModel,
    selections: ResumeSelectionsModel
}

const CertificationEditor = observer((props: CertificationEditorProps) => {

    let entries: ReactNode[] = props.resume.certifications.map((entry, _1, _2) => {
        return (
            <CertificationEntry key={ entry.uuid } entry={entry.value} selections={props.selections} 
                onRemove={
                    action(()=>props.resume.certifications.remove(entry.uuid))
                }
            />
        );
    });

    return (
        <Stack spacing={2} direction="column" >
            {entries}
            <Button variant="contained" onClick={action(()=> {
                props.resume.certifications.add(new CertificationModel());
            })} >Add Certification</Button>
        </Stack>
    );
});

export default CertificationEditor;