const SquareButton = ( { handleClick, text } ) => (
  <button onClick={ handleClick } className="squareBtn">
    {text}
  </button>
)

const ButtonGamefield = ( { handleMove, playfield } ) => {
  
  return <>  
    {!playfield ? 'buttonfield - loading...' :
      <>
        <div id='buttongamefield'>
          <div className="row"><SquareButton handleClick={() => handleMove(0, 0)} text={playfield[0][0]} /><SquareButton handleClick={() => handleMove(0, 1)} text={playfield[0][1]} /><SquareButton handleClick={() => handleMove(0, 2)} text={playfield[0][2]} /></div>
          <div className="row"><SquareButton handleClick={() => handleMove(1, 0)} text={playfield[1][0]} /><SquareButton handleClick={() => handleMove(1, 1)} text={playfield[1][1]} /><SquareButton handleClick={() => handleMove(1, 2)} text={playfield[1][2]} /></div>
          <div className="row"><SquareButton handleClick={() => handleMove(2, 0)} text={playfield[2][0]} /><SquareButton handleClick={() => handleMove(2, 1)} text={playfield[2][1]} /><SquareButton handleClick={() => handleMove(2, 2)} text={playfield[2][2]} /></div>
        </div>
      </>
    }   
      
  </>
}

export default ButtonGamefield