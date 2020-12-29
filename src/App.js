import React, {Component} from 'react'
import './App.css';
import AppItem from './AppItem/app-item';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      apps: [],
      sort: '',
      genres: '',
      error: null
    }
  }

  setSort(sort) {
    this.setState({sort})
  }
  setGenres(genres) {
    this.setState({genres})
  }

  handleSubmit(e) {
    e.preventDefault()
    const baseURL = 'http://localhost:8000/apps'
    const params = []
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`)
    }
    const query = params.join('&')
    const url = `${baseURL}?${query}`

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText)
        } 
        return res.json()
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        })
      })
      .catch(err => {
        this.setState({error: 'Sorry, could not get apps at this time.'})
      })
  }

  render() {
    const apps = this.state.apps.map((app, i) => {
      return <AppItem {...app} key={i}/>
    })
    return (
      <main>
        <h1>Google Play Apps</h1>
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor='sort'>Sort: </label>
            <select id='sort' name='sort' onChange={e => this.setSort(e.target.value)}>
              <option value=''>None</option>
              <option value='rating'>Rating</option>
              <option value='app'>App</option>
            </select>
            <label>Genres: </label>
            <select onChange={e => this.setGenres(e.target.value)}>
              <option value=''>All</option>
              <option value='Action'>Action</option>
              <option value='Puzzle'>Puzzle</option>
              <option value='Strategy'>Strategy</option>
              <option value='Casual'>Casual</option>
              <option value='Arcade'>Arcade</option>
              <option value='Card'>Card</option>
            </select>
            <button type='submit'>Search</button>
          </form>
          <div>{this.state.error}</div>
        </div>
        {apps}
      </main>
    );
  }

}

export default App;
