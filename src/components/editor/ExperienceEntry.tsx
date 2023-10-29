import { TextField, Button, Stack, FormGroup, FormControlLabel, Switch, List, ListSubheader } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";

import { ReactNode } from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeSelectionsModel from "../../models/ResumeSelections";
import ExperienceModel from "../../models/Experience";
import EditableListItem from "./EditableListItem";

interface ExperienceEntryProps {
    entry: ExperienceModel,
    selections: ResumeSelectionsModel,
    onRemove: Function
}

const ExperienceEntry = observer((props: ExperienceEntryProps) => {

    let entry = props.entry;
    let description_items: ReactNode[] = [];

    let selected_descriptions = props.selections.experience.job_description_uuids;
    for (const item of props.entry.description.data) {

        let uuid: string = item.uuid;
        let description_enabled: boolean = selected_descriptions.includes(uuid);
        description_items.push(
            <EditableListItem key={uuid} checked={description_enabled} 
                value={item.value} onChange={action((newValue: string) => { props.entry.description.set(uuid,newValue) } )}
                onToggle={action((newValue: boolean) => {
                    if (newValue) {
                        props.selections.experience.job_description_uuids.push(uuid)
                    }
                    else {
                        props.selections.experience.job_description_uuids = props.selections.experience.job_description_uuids.filter((value)=>value!=uuid);
                    }
                })}
                onRemove={action(()=>entry.description.remove(uuid))}
            />
        );
    }

    return (  
        <Stack direction="column" spacing={2} sx={{ width: "100%" }} >
            <TextField value={entry.company} onChange={action(e => { entry.company = e.target.value; })} label="Company" />
            <TextField value={entry.job_title} onChange={action(e => { entry.job_title = e.target.value; })} label="Job Title" />
            <TextField value={entry.location} onChange={action(e => { entry.location = e.target.value; })} label="Location" />
            <DatePicker<Dayjs> value={entry.start_date} label="Start Date" 
                onChange={action((newDate: Dayjs | null) => { if (newDate) { entry.start_date = dayjs(newDate); } } )} 
            />
            <FormGroup row={false} >
                <DatePicker<Dayjs> value={entry.end_date} label="End Date" disabled={ entry.still_employed }
                    onChange={action((newDate: Dayjs | null) => { if (newDate) { entry.end_date = dayjs(newDate); } } )} 
                />
                <FormControlLabel control={
                    <Switch name="still-employed" 
                        checked={entry.still_employed} 
                        onChange={action(e=>{entry.still_employed = e.target.checked; })} 
                    />
                } label="Present Position?" />
            </FormGroup>

            <List sx={{ width: "100%" }} subheader={<ListSubheader>Description Bullet Points</ListSubheader>}>

                { description_items }
            </List>
            <Button variant="contained" color="primary" onClick={action(()=>entry.description.set(crypto.randomUUID(), ""))} >+ Add Description</Button>
            <Button variant="contained" color="error" onClick={action(()=>props.onRemove())} >Remove</Button>
        </Stack>
    );
});

export default ExperienceEntry;