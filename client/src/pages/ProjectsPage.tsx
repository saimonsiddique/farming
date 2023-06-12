import { useState, useEffect } from "react";
import NewProjectForm from "../components/NewProjectForm";
import { Modal, Button } from "@mui/material";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [allProjects, setAllProjects] = useState<any[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get("http://localhost:8080/projects").then((res) => {
      setAllProjects(res.data);
    });
  }, []);

  return (
    <>
      <div className="m-2 flex flex-col gap-3 overflow-y-scroll">
        {allProjects.map((project: any) => (
          <div
            key={project?.id}
            className="rounded-md bg-[#E9D5FF] hover:cursor-pointer"
          >
            <ProjectCard key={project?.id} project={project} />
          </div>
        ))}
      </div>
      <div>
        <Button onClick={handleOpen} variant="contained">
          Add New Project
        </Button>
      </div>
      <div className="bg-white">
        <NewProjectForm open={open} handleClose={handleClose} />
      </div>
    </>
  );
}

export default ProjectsPage;
