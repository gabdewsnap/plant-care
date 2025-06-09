import {styled} from 'styled-components'


export default function Strikes({strikes}){

  const emptyStrikes = ["✖️", "✖️", "✖️"];
  const markedStrike = emptyStrikes.map((strike, index) => index < strikes ? "❌" : "✖️");

  return (
    <>
      <span>{markedStrike}</span>
    </>
  )
}