import { TextField, Button, Stack } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

import { DatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";

import { action } from "mobx";
import { observer } from "mobx-react-lite";

import EducationModel from "../../models/Education";
import ResumeSelectionsModel from "../../models/ResumeSelections";

interface EducationEntryProps {
    entry: EducationModel,
    selections: ResumeSelectionsModel,
    onRemove: Function
}

const degreeLevels: string[] = [
    "Bachelor of Science",
    "Bachelor of Fine Arts",
    "Bachelor of Arts",
    "Bachelor of Theology",
    "Master of Science",
    "Doctor of Philosophy"
];

const degreeFields: string[] = [
    "Computer Engineering",
    "Computer Science",
    "Education",
    "Electrical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Nuclear Engineering",
    "Physics",
    "Mathematics",
    "Economics",
    "Architecture",
    "Architectural Engineering",
    "Biomedical Engineering",
    "Biology",
    "Environmental Engineering",
    "Sociology",
    "Pharmacology",
    "Sports Medicine"
];

const honorsOptions: string[] = [
    "cum laude",
    "magna cum laude",
    "summa cum laude"
]

const EducationEntry = observer((props: EducationEntryProps) => {

    let entry = props.entry;

    return (  
        <Stack direction="column" spacing={2} >
            <TextField value={entry.institution} onChange={action(e => { entry.institution = e.target.value; })} label="Institution" />
            <Autocomplete freeSolo 
                          inputValue={entry.degree_level} 
                          onInputChange={action((_: any, newValue: string) => { entry.degree_level = newValue; })} 
                          options={degreeLevels}
                          renderInput={(params) => <TextField {...params} label="Degree Level" />}
            />
            <Autocomplete freeSolo 
                inputValue={entry.degree_field} 
                onInputChange={action((_: any, newValue: string) => { entry.degree_field = newValue; })} 
                options={degreeFields}
                renderInput={(params) => <TextField {...params} onChange={action(e => { entry.degree_field = e.target.value; })} label="Degree Field" />}
            />
            <TextField value={entry.location} onChange={action(e => { entry.location = e.target.value; })} label="Location" />
            {/* TODO: Use Input Adornment on end of GPA entry to display /4.00 , see: https://mui.com/material-ui/react-text-field/#input-adornments */}
            <TextField value={entry.gpa} onChange={action(e => { entry.gpa = e.target.value; })} label="GPA" />
            <Autocomplete freeSolo 
                          inputValue={entry.honors} 
                          onInputChange={action((_, newValue) => { entry.honors = newValue; })} 
                          options={honorsOptions}
                          renderInput={(params) => <TextField {...params} label="Honors" />}
            />
            <DatePicker<Dayjs> value={entry.graduation_date} label="Graduation Date" 
                onChange={action((newDate: Dayjs | null) => { if (newDate) { entry.graduation_date = dayjs(newDate); } } )} 
            />
            <Button variant="contained" color="error" onClick={action(()=>props.onRemove())} >Remove</Button>
        </Stack>
    );
});

export default EducationEntry;