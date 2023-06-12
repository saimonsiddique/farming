import React, { useRef } from 'react';
interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}
function LandDetails({ modalRef, name, location, latitude, longitude }: Props) {
  // const modalRef = useRef<HTMLDialogElement>(null);

  // const openModal = () => {
  //   if (modalRef.current) {
  //     modalRef.current.showModal();
  //   }
  // };

  return (
    <div>
      {/* <button className="btn" onClick={openModal}>
        Open Modal
      </button> */}
      <dialog ref={modalRef} className="modal">
        <form
          method="dialog"
          className="modal-box h-[50vh] w-[50vw]  bg-purple-300 flex text-2xl items-center justify-center"
        >
          <div className="flex flex-col gap-5 w-[100vw]">
            <p className="">Name: {name}</p>

            <p className="">Location: {location}</p>
            <p className="">Latitude: {latitude}</p>
            <p className="">Longitude: {longitude}</p>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default LandDetails;
