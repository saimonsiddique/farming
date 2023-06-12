import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from 'axios';

interface Data {
  name: string;
  location: string | undefined;
  latitude: Number;
  longitude: Number;
}
interface Location {
  label: string;
  value: string;
}
interface Props {
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

function GooglePlaceAutoComplete({ render, setRender }: Props) {
  const [value, setValue] = useState<Location | null>(null);
  const [name, setName] = useState<string>('');
  const [latitude, setLatitude] = useState<Number>(0);
  const [longitude, setLongitude] = useState<Number>(0);
  const baseUrl = 'http://localhost:8080';
  //   console.log(value?.label);

  const postData = async (data: Data) => {
    try {
      const response = await axios.post(`${baseUrl}/lands`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name.trim() || !value?.label.trim()) {
      alert('Please enter your name and location');
      return;
    }
    const data = {
      name,
      location: value?.label,
      latitude,
      longitude,
    };

    console.log(data);
    setRender(!render);
    postData(data);
    setName('');
  };

  useEffect(() => {
    if (value === null) return;
    geocodeByAddress(value?.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLatitude(lat);
        setLongitude(lng);
        console.log('Successfully got latitude and longitude', { lat, lng });
      });
  }, [value]);

  return (
    <div>
      <form className=" flex flex-col gap-5">
        <div>
          <label className="text-lg font-normal my-3">
            Please enter your name
          </label>
          <input
            className="border-2 border-gray-300 rounded-md w-full p-2 text-lg"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label className="text-lg font-normal my-3">
            Please enter your location
          </label>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyBLaMKfxHm0rw9SowPtFgnHxlOj9r8VcV8"
            selectProps={{
              value,
              onChange: setValue,
            }}
            // getLatLng={value}
          />
        </div>

        <button
          className="btn btn-block rounded-md text-lg bg-indigo-400 text-white hover:bg-indigo-500"
          onClick={handleSubmit}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default GooglePlaceAutoComplete;
