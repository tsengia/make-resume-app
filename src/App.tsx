import { Stack, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ResumePreview from "./components/preview/ResumePreview";
import ResumeEditor from "./components/editor/ResumeEditor";
import AppToolbar from "./components/AppToolbar";

import ResumeModel from "./models/ResumeModel";
import ViewModel from "./models/ViewModel";

import { observer } from "mobx-react-lite";
import { action } from "mobx";

let resumeModel = new ResumeModel();
let viewModel = new ViewModel();

const App = observer(()=>{

  let onFileLoad = (resume: ResumeModel, view: ViewModel) => {
    resumeModel = resume;
    viewModel = view;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" className="app-container" style={{ height: "100%", maxHeight: "100%" }}>
        <AppToolbar resume={resumeModel} view={viewModel} onLoad={action((r,v) =>{ onFileLoad(r,v)})} />
        <Paper className="resume-preview" sx={{ bgcolor: "black", width: 7/8, borderRadius: 0, height: "100%" }} >
          <ResumePreview resume={resumeModel} view={viewModel} />
        </Paper>
        <Paper sx={{ minWidth: 1/8 }} style={{ maxHeight: "100%", height: "100%" }} >
          <ResumeEditor resume={resumeModel} view={viewModel} />
        </Paper>
      </Stack>
    </LocalizationProvider>
  );
});

export default App;
