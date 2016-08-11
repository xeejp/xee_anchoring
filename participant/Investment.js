import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { changeInvestment, submitInvestment } from './actions'

const mapStateToProps = ({ investForm, money }) => (
  Object.assign({}, investForm, {
    money,
    validateValue: (value) => value >= 0 && value <= money
  })
)
const mapDispatchToProps = (dispatch) => ({
  changeInvestment: bindActionCreators(changeInvestment, dispatch),
  submitInvestment: bindActionCreators(submitInvestment, dispatch)
})

const MoneyEditor = ({ money, amp, value, changeInvestment, validateValue }) => {
  if (amp == 0) {
    return (
      <span>
        <TextField
          id='investment'
          value={value}
          onChange={(event) => changeInvestment(event.target.value, validateValue(event.target.value))}
          style={{width: "100px"}}
        />
      </span>
    )
  } else {
    let nextAmp = Math.floor(amp / 10)
    if (amp == 0) {
      nextAmp = 1
    }
    const valueInt = parseInt(value, 10)

    return (
      <span>
        <FlatButton
          label={"-" + amp}
          disabled={!validateValue(valueInt - amp)}
          onClick={() => changeInvestment(valueInt - amp, validateValue(valueInt - amp))}
        />
        <MoneyEditor
          amp={nextAmp}
          value={value}
          changeInvestment={changeInvestment}
          validateValue={validateValue}
        />
        <FlatButton
          label={"+" + amp}
          disabled={!validateValue(valueInt + amp)}
          onClick={() => changeInvestment(valueInt + amp, validateValue(valueInt + amp))}
        />
      </span>
    )
  }
}

const Investment = ({ money, value, isValid, changeInvestment, submitInvestment, validateValue }) => (
  <div>
    <p>投資画面</p>
    <MoneyEditor
      amp={Math.floor(money / 10)}
      value={value}
      changeInvestment={changeInvestment}
      validateValue={validateValue}
      money={money}
    />
    <RaisedButton
      label="投資"
      disabled={!isValid}
      primary={true}
      onClick={() => submitInvestment(+value)}
    />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Investment)