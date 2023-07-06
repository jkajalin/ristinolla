import { useEffect, useState } from "react";


let gamefield = [ 
  Array(3).fill(null),
  Array(3).fill(null),
  Array(3).fill(null) 
]

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const SquareButton = ({handleClick, text}) => (
  <button onClick={handleClick} className="squareBtn">
    {text}
  </button>
)

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
  { !playfield ? 'buttonfield - loading...' : 
    <>
    <p>Pelikenttä</p>
    <div>
      <div><SquareButton handleClick={ () => handleMove( 0, 0 ) } text={playfield[0][0]} /><SquareButton handleClick={ () => handleMove( 0, 1 ) } text={playfield[0][1]} /><SquareButton handleClick={ () => handleMove( 0, 2 ) } text={playfield[0][2]} /></div>
      <div><SquareButton handleClick={ () => handleMove( 1, 0 ) } text={playfield[1][0]} /><SquareButton handleClick={ () => handleMove( 1, 1 ) } text={playfield[1][1]} /><SquareButton handleClick={ () => handleMove( 1, 2 ) } text={playfield[1][2]} /></div>
      <div><SquareButton handleClick={ () => handleMove( 2, 0 ) } text={playfield[2][0]} /><SquareButton handleClick={ () => handleMove( 2, 1 ) } text={playfield[2][1]} /><SquareButton handleClick={ () => handleMove( 2, 2 ) } text={playfield[2][2]} /></div>    
    </div>      
    <p>playfield string: { String(playfield) }</p>
    
  </> 
    }   
      
  </>
}

const GameHistory = ( { gameHistory } ) => {
  return <div style={{float: "right"}}>{ !gameHistory? '' : gameHistory.map( ( p, i ) => <div key={i} > { p[0]  }-{p[1]}-{p[2]} ;  </div>  ) }</div>
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
  const [ winner, setWinner ] = useState('')  
  const [ playfield, setPlayfield ] = useState(gamefield)
  const [ moveHistory, setMoveHistory ] = useState( [] )
  
  let newMovesHistory = []  
  let hostTurn = false  

  const [ count, setCount ] = useState(0)

  useEffect( () =>{
    setCount( count+1 )
    if(winner){
      console.log( 'winner is ', winner )
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playfield, winner, moveHistory])

  console.log('count',count)
  
  const setCross = () => {
    setUserPawn('x')
    setHostPawn('0')    
  }

  const setZero = () => {
    setUserPawn('0')
    setHostPawn('x')    
  }

  const isHostTurn = () => {
    return hostTurn
  }

  /*
  * IC: b === true || b === false
  * FC: hostTurn === true || hostTurn === false
  */
  const setHostTurn = async ( b ) => {
    hostTurn = b
    console.log('set host turn: ', hostTurn)
  }

  const saveNewMovesHistory = async ( h ) => {
    newMovesHistory=h
    //setMoveHistory( h )
  } 

  //const getHistory = () => newMovesHistory

  const updateGamefield = async () => {
    console.log(`playfield:` ,String(playfield))
    gamefield = playfield    
  }

  /*
  * Places move of current player and handle history logic
  * IC: ( i1 <=2 && i2 <=2 ) && pawn != null
  *    
  */

  const move = async (  i1 , i2, pawn ) => {
    console.log(`user pawn ${userPawn}`)    

    await updateGamefield()

    const newplayfield = gamefield.slice()
    if( String(playfield[i1][i2]) === 'x' || String(playfield[i1][i2]) === '0'){
      console.log(`ruutu varattu`)      

    }else{
      console.log(`ruutu vapaa`)
      //newplayfield[i1][i2]= userPawn
      newplayfield[i1][i2]= pawn
      
      if(pawn === userPawn){
        await setHostTurn(true)                
      }else{            
        await setHostTurn(false)
      }

      // setMoveHistory( [ ...moveHistory, [i1,i2, pawn] ])      
      // setMoveHistory( moveHistory.concat([[i1,i2, pawn]]) )
      // await setHistory( history.concat([[i1,i2, pawn]]) )      
      // setMoveHistory( history.concat([[i1,i2, pawn]]) )

      //history= history.concat([[i1,i2, pawn]])
      console.log('NewMovesHistory berofe: ', String(newMovesHistory))      
      await saveNewMovesHistory( newMovesHistory.concat([[i1,i2, pawn]]) ) // this works    

      console.log(`move ${gamefield[i1][i2]} to`, i1, i2 )
      console.log('NewMoves History:', String(newMovesHistory) )
      
    }  
    console.log('MoveHistory Before:', String(moveHistory) )
    setMoveHistory( newMovesHistory.concat(moveHistory)  ) // this works \ o /
    
    setPlayfield( newplayfield )
    console.log('NewMoves History, again:', String(newMovesHistory) )
    console.log('MoveHistory again:', String(moveHistory) )
  }

  const checkWinnerLines = async () => {
    // rows
     if( playfield[0][0] && playfield[0][0] === playfield[0][1] && playfield[0][1] === playfield[0][2] ){
        setWinner( String(playfield[0][0]) )
        return winner
     }
     if( playfield[1][0] && playfield[1][0] === playfield[1][1] && playfield[1][1] === playfield[1][2] ){
      setWinner( String(playfield[1][0]) )
      return winner
    }
    if( playfield[2][0] && playfield[2][0] === playfield[2][1] && playfield[2][1] === playfield[2][2] ){
      setWinner( String(playfield[2][0]) )
      return winner
    }
    // columns
    if( playfield[0][0] && playfield[0][0] === playfield[1][0] && playfield[1][0] === playfield[2][0] ){
      setWinner( String(playfield[0][0]) )
      return winner
    }
    if( playfield[0][1] && playfield[0][1] === playfield[1][1] && playfield[1][1] === playfield[2][1] ){
      setWinner( String(playfield[0][1]) )
      return winner
    }
    if( playfield[0][2] && playfield[0][2] === playfield[1][2] && playfield[1][2] === playfield[2][2] ){
      setWinner( String(playfield[0][2]) )
      return winner
    }
    // crossing lines
    if( playfield[0][0] && playfield[0][0] === playfield[1][1] && playfield[1][1] === playfield[2][2] ){
      setWinner( String(playfield[0][0]) )
      return winner
    }
    if( playfield[0][2] && playfield[0][2] === playfield[1][1] && playfield[1][1] === playfield[2][0] ){
      setWinner( String(playfield[0][2]) )
      return winner
    }
  }

  
  /*
  * pass player move and fire some game logic
  * IC: ( i1 <=2 && i2 <=2 )  
  */

  const handleMove = async (  i1 , i2  ) => {
    
    console.log('handlemove, hostTurn:', isHostTurn() )
    if ( userPawn && !winner){
      await move( i1, i2, userPawn )
      
      await updateGamefield()
      await checkWinnerLines()

      if( !winner ){        
        await hasTwoInLine()
        // check history length
        if( moveHistory.length >= 8 ){
          console.log('Game Over! Refresh page to start new game')
        }
      }
    }  
    
     
    console.log('updated gamefield: ', String(gamefield) )
  }

  /*
  * does line has two matching pawns // some host player move logic
  * IC: userPawn != null
  */
  const hasTwoInLine = async () => {
    
    console.log('handTwoInLine, hostTurn:', isHostTurn() )
    let linecordinates = ['']
    let isMiddleFree = false

    console.log('rows')
    // rows    
    //
    // isHostTurn() &&    
    if( isHostTurn() && ( playfield[0][0] === userPawn || playfield[0][2]===userPawn ) ){
      //console.log('first line')
      linecordinates = [0,0,0,2]
      console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][0] === playfield[0][2] || playfield[0][0] === playfield[0][1] || playfield[0][1] === playfield[0][2]){
        
        if( playfield[0][0] === playfield[0][2] ){
          isMiddleFree = true
          //moveHost(0,1)
          if( isHostTurn() ){
            console.log('first row middle')
            await moveHost(0,1)
          }
        }
        if( playfield[0][1] !== userPawn ){
          //moveHost(0,1)
        }
      }else{
        console.log('first row else')        
        await moveHost(0,1)
      }      
      //await moveHost(0,1)
    }
    // if( isHostTurn() && ( playfield[1][0]===userPawn || playfield[1][2]===userPawn ) && ( playfield[1][0] === playfield[1][2] || playfield[1][0] === playfield[1][1] || playfield[1][1] === playfield[1][2]) )
    if( isHostTurn() && ( playfield[1][0]===userPawn || playfield[1][2]===userPawn )  ){
      
      linecordinates = [1,0,1,2]
      console.log('linecordinates: ', String( linecordinates ))

      if( playfield[1][0] === playfield[1][2] || playfield[1][0] === playfield[1][1] || playfield[1][1] === playfield[1][2] ){

        if( playfield[1][0] === playfield[1][2] ){
          isMiddleFree = true
          if( isHostTurn() ){
            await moveHost(1,1)
          }
        }
        if( isHostTurn() && playfield[1][1] === userPawn && playfield[1][2] === userPawn ){
          await moveHost( 1, 0 )
        }
      }
      //await moveHost(1,1)
    }
    if( isHostTurn() && ( playfield[2][0] === userPawn || playfield[2][2] === userPawn ) && ( playfield[2][0] === playfield[2][2] || playfield[2][0] === playfield[2][1] || playfield[2][1] === playfield[2][2] ) ){
      
      linecordinates = [2,0,2,2]
      console.log('linecordinates: ', String( linecordinates ))
      
      if( playfield[2][0] === playfield[2][2] ){
        isMiddleFree = true
        if( isHostTurn() ){
          await moveHost(2,1)
        }
      }
      // idiot proofing
      if ( playfield[2][0] === userPawn && playfield[2][0] === userPawn ){
        await moveHost( 2,2 )
      }


    }
    console.log('columns')
    // columns
    //
    if( isHostTurn() && ( playfield[0][0] === userPawn || playfield[2][0]===userPawn )  ){
      
      linecordinates = [0,0,2,0]
      console.log('linecordinates: ', String( linecordinates ))

      if( ( playfield[0][0] === userPawn || playfield[2][0]===userPawn ) && ( playfield[0][0] === playfield[2][0] || playfield[0][0] === playfield[1][0] || playfield[1][0] === playfield[2][0] ) ){

        if( playfield[0][0] === playfield[2][0] ){
          isMiddleFree = true
          if( isHostTurn() ){
            await moveHost(1,0)
          }
        }
        
        if( isHostTurn() && playfield[0][0] !== userPawn && playfield[1][1] !== userPawn  ){
          console.log('depends')
          await moveHost(0,0)          
        }
        // is this me or what. its not even monday. idiot proofing...
        if( isHostTurn() && playfield[0][0] === userPawn && playfield[0][1] === userPawn ){
          console.log('depends 2,0')
          await moveHost(2,0) 
        }
      }

    }
    // if( isHostTurn() && ( playfield[0][1]===userPawn || playfield[2][1]===userPawn ) && ( playfield[0][1] === playfield[2][1] || playfield[0][1] === playfield[1][1] || playfield[1][1] === playfield[2][1] ) )
    if( isHostTurn() && ( playfield[0][1]===userPawn || playfield[2][1]===userPawn ) ){
      
      linecordinates = [0,1,2,1]
      console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][1] === playfield[2][1] || playfield[0][1] === playfield[1][1] || playfield[1][1] === playfield[2][1] ){

        if( playfield[0][1] === playfield[2][1] ){
          isMiddleFree = true
          if( isHostTurn() ){
            await moveHost(1,1)
          }
        }
      }
      if( isHostTurn() && playfield[0][1]===userPawn ){
        await moveHost( 1, 1 )
      }

    }
    if( isHostTurn() && ( playfield[0][2] === userPawn || playfield[2][2] === userPawn ) ){
      
      linecordinates = [0,2,2,2]
      console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][2] === playfield[2][2] || playfield[0][2] === playfield[1][2] || playfield[1][2] === playfield[2][2]  ){
        
        if( playfield[0][2] === playfield[2][2] ){
          isMiddleFree = true
          if( isHostTurn() ){
            await moveHost(1,2)
          }
        }

        if( isHostTurn() && playfield[2][2] === userPawn ){
          await moveHost( 0, 2 )
        }else(
          await moveHost( 2, 2 )
        )   
        
      }
    }else{
      console.log('last column else')
      if( isHostTurn() && playfield[1][2] === userPawn ){
        await moveHost( 0, 2 )
      }else(
        await moveHost( 2, 2 )
      ) 
    }

    // crossing lines // no any effect with additional definitions
    //
    console.log('cross lines')    
    //( playfield[0][0] === userPawn || playfield[2][2] === userPawn ) &&
    if( isHostTurn() && ( playfield[0][0] === userPawn || playfield[2][2] === userPawn ) && ( playfield[0][0] === playfield[2][2] || playfield[0][0] === playfield[1][1] || playfield[1][1] === playfield[2][2]) ){
      
      linecordinates = [0,0,2,2]
      console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][0] === playfield[2][2] ){
        isMiddleFree = true
        if( isHostTurn() ){
          await moveHost(1,1)
        }        
      }
      if( isHostTurn() && playfield[0][0] === userPawn && playfield[1][1] === userPawn ){
        await moveHost(2,2)
      }

    }
    //     if( isHostTurn() && ( playfield[0][2] === userPawn || playfield[2][0] === userPawn ) && ( playfield[0][2] === playfield[2][0] || playfield[0][2] === playfield[1][1] || playfield[1][1] === playfield[2][0] ) )
    if( isHostTurn() && ( playfield[0][2] === userPawn || playfield[2][0] === userPawn )  ){
      
      linecordinates = [0,2,2,0]
      console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][2] === playfield[2][0] || playfield[0][2] === playfield[1][1] || playfield[1][1] === playfield[2][0]  ){
        if( playfield[0][2] === playfield[2][0] ){
          isMiddleFree = true        
          if( isHostTurn() ){
            await moveHost(1,1)
          }
        }
      }
      if( playfield[0][2] === userPawn ){
        await moveHost( 2,0 )
      }else{
        await moveHost( 0,2 )
      }

    }

    //console.log('linecordinates: ', String( linecordinates ))
    if(isMiddleFree){
      console.log('middle is free for last line, place your bet')
    }    
  }
  
  const moveHost =  async ( p1, p2 ) => {
    if( hostPawn && isHostTurn() ){
      await move( p1, p2, hostPawn)      
    }else(
      console.log('aint host turn')
    )
  }
  
  return (
    <div>      
      <p>count: {count} </p>
      <GameHistory gameHistory={moveHistory} />
       

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
      <br /><br />
      NewMoves history: { String(newMovesHistory) }
    </div>
  );
}

export default App;
