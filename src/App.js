import './App.css';
import {useState,useEffect} from 'react'
import {getAllPokemon} from './components/pokemon'
import Card from './components/Card'


function App() {


  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setnextUrl] = useState('');
  const [prevUrl, setprevUrl] = useState('');
  const [loading, setloading] = useState(true);
  const initialUrl ='https://pokeapi.co/api/v2/pokemon/?limit=10'


  useEffect(() => {
    async function fetchData(){
      let response = await getAllPokemon(initialUrl);
      setnextUrl(response.next);
      setprevUrl(response.previous);
      await loadingPokemon(response.results);
      setloading(false);
    }
    fetchData();
  }, []);

    const next = async () => {
      setloading(true);
      let data = await getAllPokemon(nextUrl)
      await loadingPokemon (data.results)
      setnextUrl(data.next);
      setprevUrl(data.previous);
      setloading(false);
    }
    const prev = async () => {
      if (!prevUrl) return;
      setloading(true);
      let data = await getAllPokemon(prevUrl)
      await loadingPokemon (data.results)
      setnextUrl(data.next);
      setprevUrl(data.previous);
      setloading(false);
    }

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getAllPokemon(pokemon.url);
        return pokemonRecord;
      })
    )


    setPokemonData(_pokemonData);
  }





   return(
     <div>
       {
         loading ? <h1 className='load'>Loading...</h1> : (
            <>
           
             <div className='btn'>
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
              </div>
              <div className='grid-container'>
                {pokemonData.map((pokemon , i) => {
                  return <Card key={i} pokemon={pokemon} />
                })}

              </div>
              
          
              
            </>
         )
       }
     </div>
   )
       
       
/* test */












    }
  

  


export default App;



