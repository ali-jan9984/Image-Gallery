import React, { useEffect, useState } from 'react';
import Image from './Components/image'; // Correct component name
import ImageInput from './Components/ImageInput';

const App = () => {
  const [state, setState] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    if (term) {
      setIsLoading(true);
      fetch(`https://pixabay.com/api/?key=45131801-54b644e35e51b5bfa46410a24&q=${term}&image_type=photo&pretty=true`)
        .then(res => res.json())
        .then((data) => {
          setState(data.hits);
          setIsLoading(false);
        })
        .catch(err => {
          alert("There is an error while fetching");
          setIsLoading(false);
        });
    }
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageInput searchText={(text) => setTerm(text)} />
      {
        !loading && state.length === 0 && <h1 className='text-center font-bold text-black mt-12 text-5xl'>No Image Found..</h1>
      }
      {loading ? (
        <h1 className='text-center font-bold text-black mt-12 text-3xl'>Loading...</h1>
      ) : (
        <div className="mt-10 flex flex-wrap gap-12">
          {state.map((image, index) => (
            <Image key={index} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;



