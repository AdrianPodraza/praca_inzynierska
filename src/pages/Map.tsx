import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

type MapViewProps = {
  center: google.maps.LatLngLiteral
  onMapLoad: (map: google.maps.Map) => void
}

const MapView: React.FC<MapViewProps> = ({ center, onMapLoad }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCNQMhai__76x0J6C9DwNxEdR743Xh0Cvk',
  })

  if (!isLoaded) return <div>Ładowanie mapy...</div>

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{
        height: '400px',
        width: '100%',
        marginBottom: '20px',
        borderRadius: '10px',
      }}
      onLoad={onMapLoad}
    />
  )
}

export default MapView
