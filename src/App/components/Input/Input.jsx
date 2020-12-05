import React from 'react';
import { parseDate, getBioRemainders } from '../../logic/utils';

export default class InputField extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: '01/02/2020',
        bioInfo: {},
        days: 0,
        listOfResults: []
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
      this.setState(state => ({
          ...state,
          value: e.target.value
      }))
    }

    handleSubmit(e) {
        let dateStr = this.state.value
        let days = parseDate(dateStr)
        let bioInfo = getBioRemainders(days)

        this.setState(state => ({
            ...state,
            bioInfo,
            days,
            listOfResults: [...state.listOfResults, JSON.stringify(bioInfo), JSON.stringify(days)]
        }))

        e.preventDefault();
    }
    
    render () {
      return (
         <form onSubmit={this.handleSubmit}>
        <label>
          Date of birth:
          <input onChange={this.handleChange} value={this.state.value}/> 
          <textarea value={JSON.stringify(this.state.listOfResults)} /> 
        </label>
        <input type="submit" value="Submit" />
      </form>
      )
    }
  }