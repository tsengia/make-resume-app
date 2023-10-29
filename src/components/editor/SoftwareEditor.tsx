import { Stack, Button } from "@mui/material";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeModel from "../../models/ResumeModel";
import ResumeSelectionsModel from "../../models/ResumeSelections";

import { ReactNode } from "react";
import SoftwareModel from "../../models/Software";
import EditableListItem from "./EditableListItem";

interface SoftwareEditorProps {
    resume: ResumeModel,
    selections: ResumeSelectionsModel
}

const SoftwareEditor = observer((props: SoftwareEditorProps) => {

    let entries: ReactNode[] = props.resume.software.map((entry, _1, _2) => {
        let uuid = entry.uuid;
        return (
            <EditableListItem 
                key={ uuid }
                value={ entry.value.name } 
                checked= { props.selections.software_uuids.includes(uuid) }
                onChange={action((newValue: string) => { 
                    let newModel = entry.value;
                    newModel.name = newValue;
                    props.resume.software.set(uuid, newModel) ;
                } )}
                onToggle={action((newValue: boolean) => {
                    if (newValue) {
                        props.selections.software_uuids.push(uuid)
                    }
                    else {
                        props.selections.software_uuids = props.selections.software_uuids.filter((value)=>value!=uuid);
                    }
                })}
                onRemove={action(()=>{
                    props.selections.software_uuids = props.selections.software_uuids.filter((value)=>value!=uuid);
                    props.resume.software.remove(uuid);
                })}
            />
        );
    });

    return (
        <Stack spacing={2} direction="column" >
            {entries}
            <Button variant="contained" onClick={action(()=> {
                let new_uuid = props.resume.software.add(new SoftwareModel()).uuid;
                props.selections.software_uuids.push(new_uuid);
            })} >Add Software Experience</Button>
        </Stack>
    );
});

export default SoftwareEditor;