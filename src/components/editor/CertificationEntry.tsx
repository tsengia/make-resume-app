import { TextField, Button, Stack } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeSelectionsModel from "../../models/ResumeSelections";
import CertificationModel from "../../models/Certification";

interface CertificationEntryProps {
    key: string,
    entry: CertificationModel,
    selections: ResumeSelectionsModel,
    onRemove: Function
}

const CertificationEntry = observer((props: CertificationEntryProps) => {

    let entry = props.entry;

    return (  
        <Stack direction="column" spacing={2} >
            <TextField value={entry.institution} onChange={action(e => { entry.institution = e.target.value; })} label="Institution" />
            <TextField value={entry.name} onChange={action(e => { entry.name = e.target.value; })} label="Name" />
            <TextField value={entry.location} onChange={action(e => { entry.location = e.target.value; })} label="Location" />
            <TextField value={entry.id} onChange={action(e => { entry.id = e.target.value; })} label="Identifier" />
            <DatePicker<Dayjs> value={entry.certified_date} label="Certified Date" 
                onChange={action((newDate: Dayjs | null) => { if (newDate) { entry.certified_date = dayjs(newDate); } } )} 
            />
            <Button variant="contained" color="error" onClick={action(()=>props.onRemove())} >Remove</Button>
        </Stack>
    );
});

export default CertificationEntry;