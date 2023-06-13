import React, { useState, useEffect } from 'react';
import GooglePlaceAutoComplete from '../components/GooglePlaceAutoComplete';
import MapboxMap from '../components/MapboxMap';
import axios from 'axios';
import LandCard from '../components/LandCard';

interface Land {
  id: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
}
function LandsPage() {
  const baseUrl = 'http://localhost:8080';
  const [lands, setLands] = useState<Land[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const markerCoordinates: number[][] = [];
  useEffect(() => {
    axios.get(`${baseUrl}/lands`).then((res) => {
      // console.log(res.data);
      setLands(res.data);
    });
  }, [render]);

  // getting marker coordinates
  if (lands.length > 0) {
    lands.forEach((land: Land) => {
      markerCoordinates.push([land.longitude, land.latitude]);
    });
  }

  console.log(markerCoordinates);

  return (
    <div>
      <div className=" flex justify-between gap-2 py-5">
        <div className="flex flex-col  items-center gap-5 h-[90vh] overflow-auto">
          <div className="">
            <div className="flex flex-col gap-3 overflow-auto px-3 ">
              {lands.map((land: Land, i: Number) => (
                <div>
                  <LandCard
                    key={land.id}
                    name={land.name}
                    location={land.location}
                    latitude={land.latitude}
                    longitude={land.longitude}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="w-[36vw] h-[70vh] ">
            <MapboxMap markerCoordinates={markerCoordinates} />
          </div>
          <div className="tailwind_modal">
            <button
              className="btn btn-block rounded-lg  bg-indigo-400 text-white hover:bg-indigo-500   "
              onClick={() => window.my_modal_2.showModal()}
            >
              List your land
            </button>
            <dialog id="my_modal_2" className="modal">
              <form method="dialog" className="modal-box h-[50vh]">
                <div>
                  <GooglePlaceAutoComplete
                    render={render}
                    setRender={setRender}
                  />
                </div>
              </form>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandsPage;
