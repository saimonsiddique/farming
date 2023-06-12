import React, { useRef } from "react";
import ProjectDetails from "./ProjectDetails";

interface Props {
  project: any;
}

function ProjectCard({ project }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div>
      <div
        className="flex flex-col rounded-lg shadow-lg p-5"
        onClick={openModal}
      >
        <div className="flex justify-start">
          <div className="text-2xl font-bold">{project.projectName}</div>
        </div>
        <div className="flex gap-2">
          <span className="text-sm">Project Status: </span>
          <span
            className={`text-sm capitalize
          ${
            project.projectStatus === "started"
              ? "text-red-500"
              : project.projectStatus === "in progress"
              ? "text-yellow-500"
              : project.projectStatus === "finished"
              ? "text-green-500"
              : "text-orange-500"
          }`}
          >
            {project.projectStatus}
          </span>
        </div>
      </div>

      <div>
        <ProjectDetails
          modalRef={modalRef}
          projectName={project.projectName}
          projectStatus={project.projectStatus}
          projectDescription={project.projectDescription}
          lands={project.lands}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
