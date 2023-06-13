import { useState, useEffect, FormEvent } from "react";
import axios from "axios";

const statusOptions = ["Started", "In Progress", "Finished"];

interface Props {
  modalRef: any;
  setAllProjects: any;
}

interface Project {
  projectName: string;
  projectDescription: string;
  projectStatus: string;
  lands: string;
}

const NewProjectForm: React.FC<Props> = ({ modalRef, setAllProjects }) => {
  const [landName, setLandName] = useState<string>("");
  const [allLands, setAllLands] = useState<any[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectStatus, setProjectStatus] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:8080/lands").then((res) => {
      setAllLands(res.data);
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!landName || !projectName || !projectDescription || !projectStatus) {
      alert("Please fill in all fields");
      return;
    }
    const newProject: Project = {
      projectName: projectName.toLowerCase(),
      projectDescription: projectDescription.toLowerCase(),
      projectStatus: projectStatus.toLowerCase(),
      lands: landName,
    };
    axios.post("http://localhost:8080/projects", newProject).then((res) => {
      setAllProjects((prev: any) => [...prev, res.data]);
    });
    modalRef.current.close();
  };

  return (
    <dialog id="my_modal_2" className="modal" ref={modalRef}>
      <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          type="button"
          onClick={() => modalRef.current.close()}
        >
          ✕
        </button>
        <div className="flex flex-col justify-center items-center gap-2">
          <h3 className="font-bold text-xl uppercase">
            Add Project Information
          </h3>
          <input
            type="text"
            placeholder="Project Name"
            className="input input-bordered w-full max-w-xs rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
            required
            onChange={(e) => setProjectName(e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            className="textarea textarea-bordered w-full max-w-xs rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
          <select
            className="select select-bordered w-full max-w-xs rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
            onChange={(e) => setProjectStatus(e.target.value)}
            required
          >
            <option disabled selected>
              Project Status
            </option>
            {statusOptions.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>

          <select
            className="select select-bordered w-full max-w-xs rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
            onChange={(e) => setLandName(e.target.value)}
            required
          >
            <option disabled selected>
              Lands
            </option>
            {allLands?.map((land) => (
              <option key={land._id}>{land.name}</option>
            ))}
          </select>
        </div>
        <div className="modal-action flex justify-around">
          <button
            className="btn btn-sm btn-error btn-active rounded-lg 
            hover:text-white
          "
            type="button"
            onClick={() => modalRef.current.close()}
          >
            Cancel
          </button>
          <button
            className="btn btn-success btn-active rounded-lg btn-sm
            hover:text-white hover:bg-green-500
            "
            type="submit"
          >
            Add Project
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default NewProjectForm;
