import MapView from './Map'

function ContactUs() {
  return (
    <div className='flex flex-col place-self-center justify-between items-center w-full max-w-[960px] gap-8 mt-20'>
      <h2 className='font-bold text-2xl'>Porozmawiajmy</h2>
      <h3 className='font-bold place-self-start'>Informacje kontaktowe</h3>
      <div className='flex justify-between w-full'>
        <div className='flex flex-col'>
          <span className='font-bold'>Telefon</span>
          <span className='font-bold text-gray-400'>
            Poniedziałek - Piątek 8-16
          </span>
        </div>
        <span className='font-bold'>+48 123 456 789</span>
      </div>
      <div className='flex justify-between w-full'>
        <div className='flex flex-col'>
          <span className='font-bold'>Adres</span>
          <span className='font-bold text-gray-400'>Ulica Słowackiego 12</span>
        </div>
        <span className='font-bold'>Dębica</span>
      </div>
      <h3 className='font-bold place-self-start'>Godziny otwarcia</h3>
      <div className='flex justify-between w-full'>
        <div className='flex flex-col'>
          <span className='font-bold'>Poniedziałek - Piątek</span>
          <span className='font-bold text-gray-400'>8 - 16</span>
        </div>
        <span className='font-bold'>Otwarte</span>
      </div>
      <h3 className='font-bold place-self-start'>Lokalizacja</h3>
      <MapView />
    </div>
  )
}

export default ContactUs
