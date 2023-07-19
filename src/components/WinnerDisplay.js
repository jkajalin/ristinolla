/*
* IC: winner != null && winner instanceof String
* FC: returns JSX represantation of winner
*/
const WinnerDisplay = ( {winner} ) => {
  return <div id='winnerDisplay' >Winner is {winner} !</div>
}

export default WinnerDisplay