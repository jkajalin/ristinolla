import { useEffect, useState } from "react";

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const foobar = () => {
  console.log('foobar')
}

const App = () => {

  const [ userPawn, setUserPawn ] = useState('')
  const [ hostPawn, setHostPawn ] = useState('')

  let gamefield = [ 
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'] 
  ]
  
  const [ playfield, setPlayfield ] = useState(gamefield)

  const setCross = () => {
    setUserPawn('x')
    setHostPawn('0')    
  }

  const setZero = () => {
    setUserPawn('0')
    setHostPawn('x')    
  }

  const markMove = async ( field ) => {
    field = userPawn    
    console.log(field)
    
    //return field
  }

  const drawMove = async ( field ) => {
    await markMove( field )
    field=userPawn
    setPlayfield(field)
  }

  const handleMove = (  i1 , i2  ) => {
    console.log(`user pawn ${userPawn}`)
    if(gamefield[i1][i2] === 'x' && gamefield[i1][i2] === '0'){
      console.log(`ruutu varattu`)

    }else{
      console.log(`ruutu vapaa`)
      gamefield[i1][i2]= userPawn
    }
    
    console.log(`new field ${gamefield[i1][i2]}`)
    setPlayfield(gamefield)
    
    
  }

  
  const DrawPlayfield = () => {
    
    return playfield.map( (p,i) => <div key={i}> {p[0]}, {p[1]}, {p[2]} </div> )
  }

  
  return (
    <div>
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
      
      <p>Pelikenttä</p>
      <div>
        <div><Button handleClick={ () =>  handleMove( 0, 0 ) } text={playfield[0][0]} /><Button handleClick={ () => foobar() } text={gamefield[0][1]} /><Button handleClick={ () => foobar() } text={gamefield[0][2]} /></div>
        <div><Button handleClick={ () => foobar() } text={gamefield[1][0]} /><Button handleClick={ () => foobar() } text={gamefield[1][1]} /><Button handleClick={ () => foobar() } text={gamefield[1][2]} /></div>
        <div><Button handleClick={ () => foobar() } text={gamefield[2][0]} /><Button handleClick={ () => foobar() } text={gamefield[2][1]} /><Button handleClick={ () => foobar() } text={gamefield[2][2]} /></div>    
      </div>      
      <p>playfield string: { String(playfield) }</p>
      <p>gamefield at [0,0]: { String(gamefield[0][0]) }</p>
      <p>whole gamefield:</p>
      { String(gamefield) }
      <p>display:</p>
      <DrawPlayfield />
    </div>
  );
}

export default App;
