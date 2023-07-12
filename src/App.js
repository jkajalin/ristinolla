import { useState } from "react";

// gamefield arrays filled with initial values
let gamefield = [ 
  Array(3).fill(null),
  Array(3).fill(null),
  Array(3).fill(null) 
]

const Button = ( {handleClick, text} ) => (
  <button onClick={ handleClick }>
    {text}
  </button>
)

const SquareButton = ( {handleClick, text} ) => (
  <button onClick={ handleClick } className="squareBtn">
    {text}
  </button>
)

const ButtonGamefield = ( {handleMove, playfield} ) => {
  
  return <>  
  { !playfield ? 'buttonfield - loading...' : 
    <>      
      <div>
        <div className="row"><SquareButton handleClick={ () => handleMove( 0, 0 ) } text={playfield[0][0]} /><SquareButton handleClick={ () => handleMove( 0, 1 ) } text={playfield[0][1]} /><SquareButton handleClick={ () => handleMove( 0, 2 ) } text={playfield[0][2]} /></div>
        <div className="row"><SquareButton handleClick={ () => handleMove( 1, 0 ) } text={playfield[1][0]} /><SquareButton handleClick={ () => handleMove( 1, 1 ) } text={playfield[1][1]} /><SquareButton handleClick={ () => handleMove( 1, 2 ) } text={playfield[1][2]} /></div>
        <div className="row"><SquareButton handleClick={ () => handleMove( 2, 0 ) } text={playfield[2][0]} /><SquareButton handleClick={ () => handleMove( 2, 1 ) } text={playfield[2][1]} /><SquareButton handleClick={ () => handleMove( 2, 2 ) } text={playfield[2][2]} /></div>    
      </div>
  </> 
    }   
      
  </>
}

const GameHistory = ( { gameHistory } ) => {
  return <div style={{float: "right"}}>{ !gameHistory? '' : gameHistory.map( ( p, i ) => <div key={i} > { p[0] }-{ p[1] }: { p[2] } ;  </div>  ) }</div>
}

const GameBoard = ( { playfield, handleMove } ) => {
  
  if( !playfield ) {
    return 'loading...'
  }else{
    return (      
      <>        
        <ButtonGamefield handleMove={handleMove} playfield={playfield} />
      </>
    )
  }

}

/*
* IC: winner != null && winner instanceof String
* FC: returns JSX represantation of winner
*/
const WinnerDisplay = ( {winner} ) => {
  return <div id='winnerDisplay' >Winner is {winner} !</div>
}

/*
* message != null && message instanceof String
*/
const MessageDisplay = ( { message } ) => {
  return <div id='messageDisplay' > {message} </div>
}

const App = () => {

  const [ userPawn, setUserPawn ] = useState('')
  const [ hostPawn, setHostPawn ] = useState('')
  const [ winner, setWinner ] = useState('')  
  const [ playfield, setPlayfield ] = useState(gamefield)
  const [ moveHistory, setMoveHistory ] = useState( [] )
  const [ msg, setMsg ] = useState('')
  
  let newMovesHistory = []  
  let hostTurn = false  
  
  // Set user pawn as cross & host pawn as zero
  const setCross = () => {
    setUserPawn('x')
    setHostPawn('0')        
  }
  // Set userpawn as zero & host pawn as cross
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
    //console.log('set host turn: ', hostTurn)
  }

  /*
  * IC: message != null && message instanceof String
  */
  const setTempMessage = async ( message ) => {
    setMsg(message)
    console.log('Message: ', message)
    setTimeout( () => setMsg(''), 4000)
  }

  /*
  * Save temporary new moves before adding to move history
  * IC: h != null
  * FC: newMovesHistory contains newest moves in array before adding to move history
  */
  const saveNewMovesHistory = async ( h ) => {
    newMovesHistory=h
  } 

  /*
  * updates current situation of playfield to gamefield arrays
  */
  const updateGamefield = async () => {
    //console.log( `playfield:` ,String(playfield) )
    gamefield = playfield    
  }

  /*
  * Places move of current player and handle history and some game logic
  * IC: ( i1 <=2 && i2 <=2 ) && pawn != null
  *    
  */

  const move = async (  i1 , i2, pawn ) => {
    //console.log(`user pawn ${userPawn}`)

    await updateGamefield()

    const newplayfield = gamefield.slice()

    if( String( playfield[i1][i2] ) !== 'x' && String( playfield[i1][i2] ) !== '0' ){
      
      //console.log(`ruutu vapaa`)      
      newplayfield[i1][i2]= pawn
      
      // updates next turn logic
      if(pawn === userPawn){
        await setHostTurn(true)                
      }else{            
        await setHostTurn(false)
      }

      //console.log('NewMovesHistory berofe: ', String(newMovesHistory))      
      await saveNewMovesHistory( newMovesHistory.concat([[i1,i2, pawn]]) ) 

      //console.log(`move ${gamefield[i1][i2]} to`, i1, i2 )
      //console.log('NewMoves History:', String(newMovesHistory) )      

    }
    /*
    else{
      console.log(`ruutu varattu`)
    }
    */

    //console.log('MoveHistory Before:', String(moveHistory) )

    // concat move history in order moves made
    setMoveHistory( moveHistory.concat(newMovesHistory) ) 
    
    setPlayfield( newplayfield )
    
    //console.log('NewMoves History, again:', String(newMovesHistory) )
    //console.log('MoveHistory again:', String(moveHistory) )
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
    
    //console.log('handlemove, hostTurn:', isHostTurn() )
    if ( userPawn && !winner){
      await move( i1, i2, userPawn )
      
      await updateGamefield()
      await checkWinnerLines()

      if( !winner ){        
        await hasTwoInLine()
        // check history length
        if( moveHistory.length >= 8 ){
          
          await setTempMessage('Game Over!')
        }
      }else{

        setMsg('winner:', winner)
        alert('winner:', winner)
      }

      await checkWinnerLines()
    } 
     
    //console.log('updated gamefield: ', String(gamefield) )
  }

  /*
  * does line has two matching pawns // host player move logic
  * IC: userPawn != null
  */
  const hasTwoInLine = async () => {
    
    //console.log('handTwoInLine, hostTurn:', isHostTurn() )
    //let linecordinates = ['']    

    // rows    
    // row 1
    // isHostTurn() &&    
    if( isHostTurn() && ( playfield[0][0] === userPawn || playfield[0][2]===userPawn ) ){
      //console.log('first line')
      //linecordinates = [0,0,0,2]
      //console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][0] === playfield[0][2] || playfield[0][0] === playfield[0][1] || playfield[0][1] === playfield[0][2]){
        
        if( playfield[0][0] === playfield[0][2] ){          
          
          if( isHostTurn() ){
            //console.log('first row middle')
            await moveHost(0,1)
          }
        }
        /*
        if( isHostTurn() && playfield[0][1] !== userPawn ){
          //moveHost(0,1)
        }
        */
        if( isHostTurn() && playfield[0][0] === userPawn && playfield[0][1] === userPawn){
          await moveHost( 0, 2 )
        }
        if( isHostTurn() && playfield[0][2] === userPawn && playfield[0][1] === userPawn){
          await moveHost( 0, 0 )
        }
      }else{
        
        if( isHostTurn() && moveHistory.length < 3){
          //console.log('first row else')
          await moveHost(0,1)
        }        
        
      }      
      //await moveHost(0,1)
    }
    // row 2
    // if( isHostTurn() && ( playfield[1][0]===userPawn || playfield[1][2]===userPawn ) && ( playfield[1][0] === playfield[1][2] || playfield[1][0] === playfield[1][1] || playfield[1][1] === playfield[1][2]) )
    if( isHostTurn() && ( playfield[1][0]===userPawn || playfield[1][2]===userPawn )  ){
      
      //linecordinates = [1,0,1,2]
      //console.log('linecordinates: ', String( linecordinates ))

      if( playfield[1][0] === playfield[1][2] || playfield[1][0] === playfield[1][1] || playfield[1][1] === playfield[1][2] ){

        if( playfield[1][0] === playfield[1][2] ){
          
          if( isHostTurn() ){
            await moveHost(1,1)
          }
        }
        if( isHostTurn() && playfield[1][1] === userPawn && playfield[1][2] === userPawn ){
          await moveHost( 1, 0 )
        }
        if( isHostTurn() && playfield[1][1] === userPawn && playfield[1][0] === userPawn ){
          await moveHost( 1, 2 )
        }
      }      
    }        
    // row 3
    if( isHostTurn() && ( playfield[2][0] === userPawn || playfield[2][2] === userPawn )  ){
      
      //linecordinates = [2,0,2,2]
      //console.log('linecordinates: ', String( linecordinates ))
      
      if( playfield[2][0] === playfield[2][2] || playfield[2][0] === playfield[2][1] || playfield[2][1] === playfield[2][2] ){

        if( playfield[2][0] === playfield[2][2] ){
          
          if( isHostTurn() ){
            await moveHost(2,1)
          }          
        }
  
        // idiot proofing
        if ( playfield[2][0] === userPawn && playfield[2][0] === userPawn ){
          await moveHost( 2,2 )
        }
      } 
      if( isHostTurn() && moveHistory.length <2){
        await moveHost( 1, 1 )
      } 
    }    
    // columns
    // column 1
    if( isHostTurn() && ( playfield[0][0] === userPawn || playfield[2][0]===userPawn )  ){
      
      //linecordinates = [0,0,2,0]
      //console.log('linecordinates: ', String( linecordinates ))

      if( ( playfield[0][0] === userPawn || playfield[2][0]===userPawn ) && ( playfield[0][0] === playfield[2][0] || playfield[0][0] === playfield[1][0] || playfield[1][0] === playfield[2][0] ) ){

        if( playfield[0][0] === playfield[2][0] ){
          
          if( isHostTurn() ){
            await moveHost(1,0)
          }
        }
        
        if( isHostTurn() && playfield[0][0] !== userPawn && playfield[1][1] !== userPawn  ){
          
          await moveHost(0,0)          
        }
        // is this me or what. its not even monday. idiot proofing...
        if( isHostTurn() && playfield[0][0] === userPawn && playfield[0][1] === userPawn ){
          
          await moveHost(2,0) 
        }

        if( isHostTurn() && playfield[0][0] === userPawn && playfield[1][0] === userPawn ){
          await moveHost(2,0) 
        }

      }

    }
    // column 2
    // if( isHostTurn() && ( playfield[0][1]===userPawn || playfield[2][1]===userPawn ) && ( playfield[0][1] === playfield[2][1] || playfield[0][1] === playfield[1][1] || playfield[1][1] === playfield[2][1] ) )
    if( isHostTurn() && ( playfield[0][1]===userPawn || playfield[2][1]===userPawn ) ){
      
      //linecordinates = [0,1,2,1]
      //console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][1] === playfield[2][1] || playfield[0][1] === playfield[1][1] || playfield[1][1] === playfield[2][1] ){

        if( playfield[0][1] === playfield[2][1] ){
          
          if( isHostTurn() ){
            await moveHost(1,1)
          }
        }
        if( isHostTurn() && playfield[0][1] === userPawn && playfield[1][1] === userPawn ){
          await moveHost( 2, 1 )
        }

      }
      if( isHostTurn() && playfield[0][1]===userPawn ){
        await moveHost( 1, 1 )
      }
      if( isHostTurn() && playfield[1][1]===userPawn && playfield[2][1]===userPawn){
        await moveHost( 0, 1 )
      }

    }
    // column 3
    if( isHostTurn() && ( playfield[0][2] === userPawn || playfield[2][2] === userPawn ) ){
      
      //linecordinates = [0,2,2,2]
      //console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][2] === playfield[2][2] || playfield[0][2] === playfield[1][2] || playfield[1][2] === playfield[2][2]  ){
        
        if( playfield[0][2] === playfield[2][2] ){
          
          if( isHostTurn() ){
            await moveHost(1,2)
          }
        }

        if( isHostTurn() && playfield[2][2] === userPawn ){
          await moveHost( 0, 2 )
        }else(
          await moveHost( 2, 2 )
        )
        if( isHostTurn() && playfield[0][2] === hostPawn && ( playfield[1][1] !=='x' || playfield[1][1] !=='0') ){
          await moveHost( 1, 1 )
        }   
        
      }
    }else{
      //console.log('last column else')
      if( isHostTurn() && playfield[1][2] === userPawn ){
        await moveHost( 0, 2 )
      }else(
        await moveHost( 2, 2 )
      ) 
    }

    // crossing lines
    //( playfield[0][0] === userPawn || playfield[2][2] === userPawn ) &&
    if( isHostTurn() && ( playfield[0][0] === userPawn || playfield[2][2] === userPawn ) && ( playfield[0][0] === playfield[2][2] || playfield[0][0] === playfield[1][1] || playfield[1][1] === playfield[2][2]) ){
      
      //linecordinates = [0,0,2,2]
      //console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][0] === playfield[2][2] ){
        
        if( isHostTurn() ){
          await moveHost(1,1)
        }        
      }
      if( isHostTurn() && playfield[0][0] === userPawn && playfield[1][1] === userPawn ){
        await moveHost(2,2)
      }
      if( isHostTurn() && playfield[2][2] === userPawn && playfield[1][1] === userPawn ){
        await moveHost(0,0)
      }
    }
    //     if( isHostTurn() && ( playfield[0][2] === userPawn || playfield[2][0] === userPawn ) && ( playfield[0][2] === playfield[2][0] || playfield[0][2] === playfield[1][1] || playfield[1][1] === playfield[2][0] ) )
    if( isHostTurn() && ( playfield[0][2] === userPawn || playfield[2][0] === userPawn )  ){
      
      //linecordinates = [0,2,2,0]
      //console.log('linecordinates: ', String( linecordinates ))

      if( playfield[0][2] === playfield[2][0] || playfield[0][2] === playfield[1][1] || playfield[1][1] === playfield[2][0]  ){
        if( playfield[0][2] === playfield[2][0] ){
                  
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
    if( isHostTurn() && ( playfield[1][1] === hostPawn || playfield[0][2] === hostPawn )  ){
      await moveHost( 2,0 )
    }
    // random cases
    if( isHostTurn() && playfield[2][0] === playfield[2][2] && playfield[2][0] === hostPawn && playfield[2][1] === userPawn ){
      if( playfield[1][1] !=='x' || playfield[1][1] !=='0' ){
        await moveHost(1,1)
      }
      if( isHostTurn() && ( playfield[1][1] ==='x' || playfield[1][1] ==='0' ) ){
        await moveHost(1,0)
      }
    }
    // row 2 random case
    if ( isHostTurn() && ( playfield[1][1]===userPawn ) && playfield[1][0] === playfield[1][2] && playfield[2][2]===hostPawn && playfield[1][2] !== userPawn ){
      //console.log('row 2 random case')
      await moveHost( 1, 2 )
    }

    //console.log('linecordinates: ', String( linecordinates ))

  }
  
  const moveHost =  async ( p1, p2 ) => {
    if( hostPawn && isHostTurn() ){
      await move( p1, p2, hostPawn )      
    }    
  }

  /*
  * Init new game and start game with initial values
  */
  const initNewGame = () => {
    gamefield = [ Array(3).fill(null), Array(3).fill(null), Array(3).fill(null) ]
    setPlayfield( gamefield )
    setMoveHistory([])
    newMovesHistory = []
    setWinner('')
    setHostTurn(false)
    setUserPawn('')
    setHostPawn('')
  }
  
  return (
    <div id='game'>
      { !msg? '' : <MessageDisplay message={msg} />} 
      { !winner? '' : <WinnerDisplay winner={winner} />}

      <GameHistory gameHistory={moveHistory} />

      { !userPawn? <div>
          <p>Valitse pelimerkki</p>
          <p>
            <Button handleClick={ () => setCross() } text={'x'} />
            <Button handleClick={ () => setZero() } text={'0'} />
          </p> 
        </div>
        :
        <div>
          <div>Pelaaja pelimerkki: {userPawn}</div>
          <div>Koneen pelimerkki: {hostPawn}</div>
                    
          <p>Pelaaja {userPawn} aloittaa pelin</p>        
        </div>
        
      }
      
      <GameBoard playfield={playfield} handleMove={handleMove} />
      <br />
      <Button handleClick={ () => initNewGame() } text={'Restart game'} />

    </div>
  );
}

export default App;
