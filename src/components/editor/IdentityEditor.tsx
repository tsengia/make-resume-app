import { TextField, Stack, Divider, Switch, FormGroup, FormControlLabel } from "@mui/material";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeModel from "../../models/ResumeModel";
import ResumeSelectionsModel from "../../models/ResumeSelections";

interface IdentityEditorProps {
    resume: ResumeModel,
    selections: ResumeSelectionsModel
}

const IdentityEditor = observer((props: IdentityEditorProps) => {

    let name = props.resume.identity.name;
    let contact = props.resume.identity.contact;
    let address = props.resume.identity.address;

    let selections = props.selections.identity;

    return (  
        
        <Stack spacing={2} direction="column" >
            <Divider>Name</Divider>
            <TextField name="first-name" label="First Name" variant="standard" 
                defaultValue={ name.first } onChange={action(e => {name.first = e.target.value; } )} 
            />
            <FormGroup row={true} >
                <TextField sx={{ width: "75%" }} name="middle-name" label="Middle Name" variant="standard" 
                    defaultValue={ name.middle } onChange={action(e => {name.middle = e.target.value; } )} 
                />
                <FormControlLabel control={
                    <Switch name="abbreviate-middle-name" 
                        checked={selections.middle_name_initial} 
                        onChange={action(e=>{selections.middle_name_initial = e.target.checked; })} 
                    />
                } label="Use Initial" />
            </FormGroup>
            <FormGroup row={true} >
                <TextField sx={{ width: "75%" }} name="last-name" label="Last Name" variant="standard" 
                    defaultValue={ name.last } onChange={action(e => {name.last = e.target.value; } )} 
                />
                <FormControlLabel control={
                    <Switch name="abbreviate-last-name" 
                        checked={selections.last_name_initial} 
                        onChange={action(e=>{selections.last_name_initial = e.target.checked; })} 
                    />
                } label="Use Initial" />
            </FormGroup>
            <Divider>Contact Info</Divider>
            <TextField name="email" label="EMail" variant="standard" 
                defaultValue={ contact.email } onChange={action(e => {contact.email= e.target.value; } )} 
            />
            <TextField name="phone" label="Phone #" variant="standard" 
                defaultValue={ contact.phone } onChange={action(e => {contact.phone = e.target.value; } )} 
            />
            <TextField name="url" label="Website" variant="standard" 
                defaultValue={ contact.url } onChange={action(e => {contact.url = e.target.value; } )} 
            />
            <Divider>Address</Divider>
            <TextField name="address-1" label="Address" variant="standard" 
                defaultValue={ address.firstLine } onChange={action(e => {address.firstLine = e.target.value; } )} 
            />
            <TextField name="address-2" label="Address 2nd Line" variant="standard" 
                defaultValue={ address.secondLine } onChange={action(e => {address.secondLine = e.target.value; } )} 
            />
        </Stack>
    );
});

export default IdentityEditor;