import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { startGame } from '../../redux/ducks/session'

const ResetCurrentGameButton = (props) => {

  const handleResetGame = () => {
    props.startGame(props.session)
  }

  return (
    <Button onClick={() => handleResetGame()}>
      Reset Game
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

const mapDispatchToProps = {
  startGame
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetCurrentGameButton)
