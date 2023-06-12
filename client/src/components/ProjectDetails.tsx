import React from "react";

interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  projectName: string;
  projectStatus: string;
  projectDescription: string;
  lands: string[];
}

function ProjectDetails({
  modalRef,
  projectName,
  projectStatus,
  projectDescription,
  lands,
}: Props) {
  return (
    <div>
      <dialog ref={modalRef} className="modal">
        <form
          method="dialog"
          className="modal-box h-[50vh] w-[50vw] bg-purple-300 flex text-2xl items-center justify-center"
        >
          <div className="flex flex-col gap-5 w-[100vw]">
            <p>
              <span className="text-md font-semibold">Project Name:</span>{" "}
              {projectName}
            </p>
            <p>
              <span className="text-md font-semibold">Project Status:</span>{" "}
              {projectStatus}
            </p>
            <p>
              <span className="text-md font-semibold">
                Project Description:
              </span>{" "}
              {projectDescription}
            </p>
            <p>
              <span className="text-md font-semibold">Lands:</span>{" "}
              {lands.map((land, i) => (
                <span key={i}>{land},</span>
              ))}
            </p>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ProjectDetails;