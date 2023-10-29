import { Button, Paper, Tooltip } from "@mui/material";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import FileOpenOutlined from "@mui/icons-material/FileOpenOutlined";
import PrintOutlined from "@mui/icons-material/PrintOutlined";

import { action, flow, flowResult } from "mobx";
import { observer } from "mobx-react-lite";

import ResumeModel from "../models/ResumeModel.js";
import ViewModel from "../models/ViewModel.js";

import { open, save } from '@tauri-apps/api/dialog';
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';

interface AppToolbarProps {
  resume: ResumeModel,
  view: ViewModel,
  onLoad: (r: ResumeModel, v: ViewModel) => void
}

interface SavedFileModel {
  resume: ResumeModel,
  view: ViewModel
}

let AppToolbar = observer((props: AppToolbarProps) => { 

  function SaveCommand() {
    save({
      filters: [{name:"JSON File", "extensions":["json"]}]
    }).then((selected: string | null) => {
      if (selected === null) {
        console.log("Save cancelled");
      }
      else {
        console.log("Save to " + selected);
        const save_object: SavedFileModel = { resume: props.resume, view: props.view };
        writeTextFile(selected, JSON.stringify(save_object)).then(()=>{
          console.log("Save successful!");
          /// TODO: Add feedback to user
        }).catch((e: any)=>{
          console.error("Save failed, reason: " + e);
          /// TODO: Add feedback to user
        });
      }
    });
  }

  let OpenCommand = flow( function* () {
      /// TODO: Add try/catch blocks
      // Let the user select a file to open
      let result: string | null = null;
      result = yield open(
        {
          multiple: false, 
          filters: [{ name: "JSON Files", extensions: ["json"]}]
        }
      );

      if (result === null) {
        console.log("Selection cancelled");
        return;
      }
      if (Array.isArray(result)) {
        console.error("User selected multiple files for open which is not allowed!");
        return;
      }
      console.log("User selected " + result);

      // Read the file
      let read_result: string | null = null; 
      read_result = yield readTextFile(result);

      if (read_result === null) {
        console.error("Read call failed!");
        return;
      }

      const parsed_obj: SavedFileModel = JSON.parse(read_result);
      if (parsed_obj != null) {
        console.log("Parse successful!");
        props.resume.load(parsed_obj.resume);
        props.view.load(parsed_obj.view);
      }
      console.log(parsed_obj);
      console.log(props.resume);
      console.log(props.view);
    }
  );

  return (
    <Paper className="side-ribbon" sx={{ width: 1/32, height: "100%", borderRadius: 0 }} >
      <Tooltip title="Open" placement="right" arrow onClick={OpenCommand} >
        <Button variant="text" sx={{ width: "100%" }} >
          <FileOpenOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="Save" placement="right" arrow >
        <Button variant="text" sx={{ width: "100%" }} onClick={SaveCommand} >
          <SaveOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="Print" placement="right" arrow >
        <Button variant="text" sx={{ width: "100%" }} >
          <PrintOutlined />
        </Button>
      </Tooltip>
    </Paper>
  );
});

export default AppToolbar;