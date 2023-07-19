const GameHistory = ( { gameHistory } ) => {
  return <div style={{float: "right"}}>{ !gameHistory? '' : gameHistory.map( ( p, i ) => <div key={i} > { p[0] }-{ p[1] }: { p[2] } ;  </div>  ) }</div>
}

export default GameHistory