import { TextField, Stack, Divider, Dialog, MenuItem, Select, Button, DialogActions, 
    SelectChangeEvent, InputLabel, DialogTitle, DialogContent, DialogContentText, 
    FormControl, Tooltip
} from "@mui/material";
import { ReactNode, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";


import ViewModel from "../../models/ViewModel";
import ResumeTheme from "../../models/ResumeTheme";

interface ThemeEditorProps {
    view: ViewModel;
}

const ThemeEditor = observer((props: ThemeEditorProps) => {
let view = props.view;

const [dialogOpen, setDialogOpen] = useState(false);
let dialogNewThemeName = useRef("");

let themeItems: ReactNode[] = view.themes.map((theme: ResumeTheme, _) => {
    return (<MenuItem key={theme.uuid} value={theme.uuid} >{theme.name}</MenuItem>);
});

const handleSubmitNewTheme = function() {
    let newTheme: ResumeTheme = new ResumeTheme();
    // TODO: Perform validation that user entered correct values and didn't leave things blank
    newTheme.name = dialogNewThemeName.current;
    view.addTheme(newTheme);
    view.theme = newTheme;

    dialogNewThemeName.current = "";

    setDialogOpen(false);
}

return (  
    <Stack direction="column" spacing={2} >
            <Stack spacing={2} direction="row" >
                <FormControl sx={{ minWidth: 7/8 }} >
                    <InputLabel id="theme-select-label" >Posting</InputLabel>
                    <Select label="Theme" labelId="theme-select-label" name="theme-select" value={view.theme.uuid}
                        onChange={action((e: SelectChangeEvent<string>, _) => {
                            // e.target.value is the UUID of the theme
                            view.selectTheme(e.target.value);
                        })} 
                    >
                        {themeItems}
                    </Select>
                
                </FormControl>
                <Tooltip title="Add New Theme" >
                    <Button variant="contained" sx={{ width: 1/8  }} onClick={() => setDialogOpen(true)} >+</Button>
                </Tooltip>
            </Stack>
        <Stack spacing={2} direction="column" >
            <TextField value={view.theme.name} variant="outlined" label="Theme Name" name="theme-name"
                onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.theme.name = e.target.value; })} 
            />

            <TextField value={view.theme.margin.left} variant="outlined" label="Left-Right Margin" name="theme-margin-sides"
                onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.theme.margin.left = e.target.value; view.theme.margin.right = e.target.value; })} 
            />

            <TextField value={view.theme.margin.top} variant="outlined" label="Top-Bottom Margin" name="theme-margin-ends"
                onChange={action((e: React.ChangeEvent<HTMLInputElement>) => { view.theme.margin.top = e.target.value; view.theme.margin.bottom = e.target.value; })} 
            />

            <Divider>Danger Zone</Divider>
            {/* User is not allowed to delete theme if it is the last one in the list */}
            <Button variant="contained" color="error" disabled={ view.themes.length <= 1 } onClick={action(()=>{ view.removeTheme(view.theme); })} >Delete Theme</Button>
        </Stack>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} >
            <DialogTitle>New Theme</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter name of new Theme:</DialogContentText>
                <Stack direction="column" spacing={2} >
                    <TextField autoFocus id="new-theme-name" label="Theme Name" type="text" variant="standard" required onChange={e => dialogNewThemeName.current = e.target.value } />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} >Cancel</Button>
                <Button onClick={action(() => { handleSubmitNewTheme() })} >OK</Button>
            </DialogActions>
        </Dialog>
        
    </Stack>
);
});

export default ThemeEditor;