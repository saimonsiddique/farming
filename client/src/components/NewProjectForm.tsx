import { useState, useEffect, FormEvent } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statusOptions = ["Started", "In Progress", "Finished"];

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface Project {
  projectName: string;
  projectDescription: string;
  projectStatus: string;
  lands: string[];
}

const NewProjectForm: React.FC<Props> = ({ open, handleClose }) => {
  const [landName, setLandName] = useState<string[]>([]);
  const [allLands, setAllLands] = useState<any[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/lands").then((res) => {
      setAllLands(res.data);
    });
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof landName>) => {
    const {
      target: { value },
    } = event;
    setLandName(
      typeof value === "string" ? value.split(",") : (value as string[])
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject: Project = {
      projectName: projectName.toLowerCase(),
      projectDescription: projectDescription.toLowerCase(),
      projectStatus: projectStatus.toLowerCase(),
      lands: landName,
    };
    axios.post("http://localhost:8080/projects", newProject).then((res) => {
      handleClose();
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <div className="m-auto p-2 w-96 rounded-md mt-60 bg-[#FAF7F5]">
          <h3 className="flex font-bold text-lg justify-center">Hello!</h3>
          <div>
            <div className="mt-1">
              <TextField
                sx={{ m: 1, width: 350 }}
                id="project-name"
                label="Project Name"
                variant="outlined"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <div className="mt-1 flex">
                <TextField
                  sx={{ m: 1, width: 300 }}
                  id="project-description"
                  label="Project Description"
                  maxRows={4}
                  variant="outlined"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
                <FormControl sx={{ m: 1, width: 150 }}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    value={projectStatus}
                    label="Status"
                    id="status"
                    onChange={(e) => setProjectStatus(e.target.value as string)}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div>
              <FormControl sx={{ m: 1, width: 350 }}>
                <InputLabel id="demo-multiple-checkbox-label">Land</InputLabel>
                <Select
                  multiple
                  value={landName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={MenuProps}
                >
                  {allLands.map((land) => (
                    <MenuItem key={land.id} value={land.name}>
                      <Checkbox
                        checked={landName.indexOf(land.name) > -1}
                      ></Checkbox>
                      <ListItemText primary={land.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="contained"
              className="rounded-md"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" className="rounded-md" type="submit">
              Create
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NewProjectForm;
