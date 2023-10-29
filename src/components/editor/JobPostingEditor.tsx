import { TextField, Stack, Divider, Dialog, MenuItem, Select, Button, DialogActions, 
        SelectChangeEvent, InputLabel, DialogTitle, DialogContent, DialogContentText, 
        FormControl, Tooltip
    } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import dayjs, { Dayjs } from "dayjs";

import ViewModel from "../../models/ViewModel";
import JobPosting from "../../models/JobPosting";

interface JobPostingEditorProps {
    view: ViewModel;
}

const JobPostingEditor = observer((props: JobPostingEditorProps) => {
    let view = props.view;

    const [dialogOpen, setDialogOpen] = useState(false);
    let dialogNewTitle = useRef("");
    let dialogNewCompany = useRef("");

    let jobItems: JSX.Element[] = view.jobs.map((value: JobPosting, _) => {
        return (<MenuItem key={value.uuid} value={value.uuid} >{value.title} at {value.company}</MenuItem>)
    });

    const handleSubmitNewPosting = function() {
        let newJob: JobPosting = new JobPosting();
        // TODO: Perform validation that user entered correct values and didn't leave things blank
        newJob.title = dialogNewTitle.current;
        newJob.company = dialogNewCompany.current;
        view.addJob(newJob);
        view.job = newJob;

        dialogNewTitle.current = "";
        dialogNewCompany.current = "";

        setDialogOpen(false);
    }

    return (  
        <Stack direction="column" spacing={2} >
                <Stack spacing={2} direction="row" >
                    <FormControl sx={{ minWidth: 7/8 }} >
                        <InputLabel id="job-posting-select-label" >Posting</InputLabel>
                        <Select label="Posting" labelId="job-posting-select-label" name="job-posting-select" value={view.job.uuid}
                            onChange={action((e: SelectChangeEvent<string>, _) => {
                                // e.target.value is the UUID of the job
                                view.selectJob(e.target.value);
                            })} 
                        >
                            {jobItems}
                        </Select>
                    
                    </FormControl>
                    <Tooltip title="Add New Posting" >
                        <Button variant="contained" sx={{ width: 1/8  }} onClick={() => setDialogOpen(true)} >+</Button>
                    </Tooltip>
                </Stack>
            <Stack spacing={2} direction="column" >
                {/* We add the key=UUID so that when user selects new job positing from drop down, the defaultValue gets changed and component re-renders */}
                <TextField value={view.job.title} variant="outlined" label="Job Title" name="job-title" 
                    onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.job.title = e.target.value; })} 
                />
                <TextField value={view.job.company} variant="outlined" label="Company" name="job-company" 
                    onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.job.company = e.target.value; })} 
                />
                <TextField value={view.job.location} variant="outlined" label="Location" name="job-location" 
                    onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.job.location = e.target.value; })} 
                />
                <TextField value={view.job.url} variant="outlined" label="URL of Posting" name="job-url" 
                    onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.job.url = e.target.value; })} 
                />
                <DatePicker<Dayjs> value={view.job.date_posted} label="Posting Date" 
                    onChange={action((newDate: Dayjs | null, _) => { if (newDate) { view.job.date_posted = dayjs(newDate); } } )} 
                />

                <TextField value={view.job.description} multiline rows={4} variant="outlined" 
                    placeholder="Description" label="Description" name="job-description" id="job-description"
                    onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.job.description = e.target.value; })} 
                />
                <DatePicker<Dayjs> value={view.job.applied_date} label="Applied Date" 
                    onChange={action((newDate: Dayjs | null, _) => { if (newDate) { view.job.applied_date = dayjs(newDate); } } )} 
                />
                <TextField value={view.job.company_page} variant="outlined" label="Company URL" name="company-url" 
                    onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.job.company_page = e.target.value; })} 
                />

                <Divider>Danger Zone</Divider>
                {/* User is not allowed to delete job posting if it is the last one in the list */}
                <Button variant="contained" color="error" disabled={ view.jobs.length <= 1 } onClick={action(()=>{ view.removeJob(view.job); })} >Delete Posting</Button>
            </Stack>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} >
                <DialogTitle>New Job Posting</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter title and company of the new job posting:</DialogContentText>
                    <Stack direction="column" spacing={2} >
                        <TextField autoFocus id="new-job-title" label="Job Title" type="text" variant="standard" required onChange={e => dialogNewTitle.current = e.target.value } />
                        <TextField autoFocus id="new-job-company" label="Company" type="text" variant="standard" required onChange={e => dialogNewCompany.current = e.target.value } />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} >Cancel</Button>
                    <Button onClick={action(() => { handleSubmitNewPosting() })} >OK</Button>
                </DialogActions>
            </Dialog>
            
        </Stack>
    );
});

export default JobPostingEditor;