import { useState } from "react";

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

  const setCross = () => {
    setUserPawn('x')
    setHostPawn('0')
  }

  const setZero = () => {
    setUserPawn('0')
    setHostPawn('x')
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
      <div><Button handleClick={ () => foobar() } text={gamefield[0][0]} /><Button handleClick={ () => foobar() } text={gamefield[0][1]} /><Button handleClick={ () => foobar() } text={gamefield[0][2]} /></div>
      <div><Button handleClick={ () => foobar() } text={gamefield[1][0]} /><Button handleClick={ () => foobar() } text={gamefield[1][1]} /><Button handleClick={ () => foobar() } text={gamefield[1][2]} /></div>
      <div><Button handleClick={ () => foobar() } text={gamefield[2][0]} /><Button handleClick={ () => foobar() } text={gamefield[2][1]} /><Button handleClick={ () => foobar() } text={gamefield[2][2]} /></div>    
      </div>      

    </div>
  );
}

export default App;
