import { useState, useEffect, useRef } from "react";
import NewProjectForm from "../components/NewProjectForm";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    axios.get("http://localhost:8080/projects").then((res) => {
      setAllProjects(res.data);
    });
  }, []);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="flex w-[80vw] justify-between">
      <div className="m-2 flex flex-col gap-3 h-[90vh] overflow-y-scroll">
        {allProjects.map((project: any) => (
          <div
            key={project?.id}
            className="rounded-md bg-[#ffffff] hover:cursor-pointer"
          >
            <ProjectCard key={project?.id} project={project} />
          </div>
        ))}
      </div>
      <div>
        <button className="btn m-2 btn-info rounded-lg" onClick={openModal}>
          Add New Project
        </button>
        <NewProjectForm modalRef={modalRef} setAllProjects={setAllProjects} />
      </div>
    </div>
  );
}

export default ProjectsPage;
