import ButtonGamefield from './ButtonGamefield'

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

export default GameBoard