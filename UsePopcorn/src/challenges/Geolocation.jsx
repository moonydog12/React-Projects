import { useState } from 'react';

const useGeolocation = () => {
  const [position, setPosition] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosition = () => {
    if (!navigator.geolocation) return setError('Your browser does not support geolocation');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { position, isLoading, error, getPosition };
};

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  const { position, isLoading, error, getPosition } = useGeolocation();
  const { lat, lng } = position;

  const handleClick = () => {
    setCountClicks(countClicks + 1);
    getPosition();
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
