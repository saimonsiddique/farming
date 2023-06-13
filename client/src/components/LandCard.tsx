import React, { useRef } from 'react';
import LandDetails from './LandDetails';
import { GrLocation } from 'react-icons/gr';
interface Props {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}

function LandCard({ name, location, latitude, longitude }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div>
      <div
        className="card h-full w-96  text-primary-content shadow-sm border-2 border-purple-200  hover:cursor-pointer"
        onClick={openModal}
      >
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div className="flex items-center gap-1">
            <GrLocation />
            <p>{location}</p>
          </div>

          <div className="card-actions justify-end">
            {/* <button className="btn">Buy Now</button> */}
          </div>
        </div>
      </div>

      <div className="">
        <LandDetails
          modalRef={modalRef}
          name={name}
          location={location}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    </div>
  );
}

export default LandCard;
