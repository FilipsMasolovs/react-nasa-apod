import './App.css'
import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();

    this.state = { 
      fullExplanation: false,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    };

    this.getData = this.getData.bind(this);
    this.handleReadMore = this.handleReadMore.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    fetch(`https://api.nasa.gov/planetary/apod?date=${this.state.year}-${this.state.month}-${this.state.day}&api_key=BmJk1VkfUuy8AYtbejScKfSfrOvBK01K2d5OWT3E`, { method: 'GET', redirect: 'follow' })
    .then((response) => response.json())
    .then((result) => {
      this.setState({ data: result })
    })
    .catch((error) => console.log('error', error))
  }

  handleReadMore() {
    this.setState({
      fullExplanation: !this.state.fullExplanation
    })
  }

  handleRandom() {
    this.setState({
      year: Math.floor(Math.random() * (2021-1995)) + 1995,
      month: Math.floor(Math.random() * 12) + 1,
      day: Math.floor(Math.random() * 31) + 1
    })
    this.getData()
  }
  
  render() {
    let media = null
    if (this.state.data && this.state.data.media_type === 'image') {
      media = <img className='mediaContent' src={this.state.data && this.state.data.url} alt={this.state.data && this.state.data.title} />
    } else {
      media = <iframe className='mediaContent' src={this.state.data && this.state.data.url} title={this.state.data && this.state.data.title} allowFullScreen />
    }

    let explanation = null
    if (this.state.fullExplanation) {
      explanation = <p>{this.state.data && this.state.data.explanation}</p>
    } else {
      explanation = <p>{this.state.data && this.state.data.explanation.substring(0,100)}...</p>
    }

    return (
      <>
        <h1>{this.state.data && this.state.data.title}</h1>
        <div className='mediaContainer'>
          {media}
        </div>
        {explanation}
        <button className='readMoreButton' onClick={this.handleReadMore}>{this.state.fullExplanation ? 'Show less' : 'Show more'}</button>
        <i className="fa fa-refresh" onClick={this.handleRandom} style={{fontSize: '24px'}} />
      </>
    )
  }
}