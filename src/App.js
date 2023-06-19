import { useEffect, useState } from "react";


let gamefield = [ 
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'] 
]

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const foobar = () => {
  console.log('foobar')
}

const DrawPlayfield = ( {playfield} ) => {
  //console.log(playfield)
  if(playfield){
    return playfield.map( (p,i) => <div key={i}> {p[0]}, {p[1]}, {p[2]} </div> )
  }else{
    return ''
  }
  
}



const ButtonGamefield = ( {handleMove, playfield} ) => {
  
  return <>
  { !playfield ? 'exist' : 'or does it' }
  { !playfield ? 'shit' : 
    <>
    <p>Pelikenttä</p>
    <div>
      <div><Button handleClick={ () => handleMove( 0, 0 ) } text={playfield[0][0]} /><Button handleClick={ () => handleMove( 0, 1 ) } text={playfield[0][1]} /><Button handleClick={ () => handleMove( 0, 2 ) } text={playfield[0][2]} /></div>
      <div><Button handleClick={ () => handleMove( 1, 0 ) } text={playfield[1][0]} /><Button handleClick={ () => handleMove( 1, 1 ) } text={playfield[1][1]} /><Button handleClick={ () => handleMove( 1, 2 ) } text={playfield[1][2]} /></div>
      <div><Button handleClick={ () => handleMove( 2, 0 ) } text={playfield[2][0]} /><Button handleClick={ () => handleMove( 2, 1 ) } text={playfield[2][1]} /><Button handleClick={ () => handleMove( 2, 2 ) } text={playfield[2][2]} /></div>    
    </div>      
    <p>playfield string: { String(playfield) }</p>
  </> 
    }   
      
  </>
}

const GameBoard = ( { playfield, handleMove } ) => {
  
  if( !playfield ) {
    return 'loading...'
  }else{
    return (      
      <>
        
        <ButtonGamefield handleMove={handleMove} playfield={playfield} />

        <p>display:</p>
        <DrawPlayfield playfield={playfield} />

        <p>gamefield at [0,0]: { String(gamefield[0][0]) }</p>
        <p>whole gamefield:</p>
        { String(gamefield) }
      </>
    )
  }

}

const App = () => {

  const [ userPawn, setUserPawn ] = useState('')
  const [ hostPawn, setHostPawn ] = useState('')  
  
  const [ playfield, setPlayfield ] = useState(gamefield)

  const [ count, setCount ] = useState(0)

  useEffect( () =>{
    setCount( count+1 )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playfield])

  console.log('count',count)
  
  const setCross = () => {
    setUserPawn('x')
    setHostPawn('0')    
  }

  const setZero = () => {
    setUserPawn('0')
    setHostPawn('x')    
  }

  const updateGamefield = async () => {
    console.log(`playfield:` ,String(playfield))
    gamefield = playfield
  }

  const move = async (  i1 , i2  ) => {
    console.log(`user pawn ${userPawn}`)    

    await updateGamefield()

    const newplayfield = gamefield.slice()
    if( String(playfield[i1][i2]) === 'x' || String(playfield[i1][i2]) === '0'){
      console.log(`ruutu varattu`)
      

    }else{
      console.log(`ruutu vapaa`)
      newplayfield[i1][i2]= userPawn
    }
    
    console.log(`new field ${gamefield[i1][i2]}`)
    
    setPlayfield( newplayfield )
  }

  const handleMove = async (  i1 , i2  ) => {
      
    await move( i1, i2 )
    await updateGamefield()
    
    console.log('updated gamefield: ', String(gamefield) )
  }
  

  /*
  useEffect( () => {
      updateGamefield()
      
    },
    [playfield, updateGamefield] 
  )
  */ 
  
  return (
    <div>
      <p>count: {count} </p>
      <p>   
      <Button handleClick={ () => foobar() } text={'foobar'} />
      </p>
      { !userPawn? <div>
          <p>'Valitse pelimerkki'</p>        
          <Button handleClick={ () => setCross() } text={'x'} />
          <Button handleClick={ () => setZero() } text={'0'} />  
        </div>
        :
        <div>
          <div>Pelaaja pelimerkki: {userPawn}</div>
          <div>Koneen pelimerkki: {hostPawn}</div>
        </div>
        
      }
      <GameBoard playfield={playfield} handleMove={handleMove} />
      
      
     
    </div>
  );
}

export default App;
