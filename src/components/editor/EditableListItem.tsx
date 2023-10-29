import { TextField, Button, Checkbox, ListItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { action } from "mobx";
import { observer } from "mobx-react-lite";

interface EditableListItemProps {
    value: string,
    checked: boolean,
    onRemove: () => void,
    onChange: (newValue: string) => void,
    onToggle: (newValue: boolean) => void
}

const EditableListItem = observer((props: EditableListItemProps) => {

    return (  
        <ListItem sx={{ width:"100%" }} >
            <TextField sx={{ width: "90%" }} value={props.value} onChange={action(e => props.onChange(e.target.value))} placeholder="Enter Description" />
            <Checkbox
                onChange={action((e)=>props.onToggle(e.target.checked))}
                checked={props.checked}
                icon={<VisibilityOffIcon />}
                checkedIcon={<VisibilityIcon />}
            />
            <Checkbox checked color="error" checkedIcon={<DeleteIcon />} onChange={action(()=>props.onRemove())} />
        </ListItem>
    );
});

export default EditableListItem;