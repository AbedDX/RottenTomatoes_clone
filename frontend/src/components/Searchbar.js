import React, { Component } from 'react';
import { Search, Grid } from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '' };

export default class Searchbar extends Component {
  state = initialState;
  movies = [];

  async componentDidMount() {
    try {
      const response = await fetch('/movies'); // Replace with your actual API endpoint
      if (response.ok) {
        const data = await response.json();
        this.movies = data.movies; // Assuming your API returns an array of movies
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      // Implement the search logic to filter movies based on the search query
      const searchResults = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.state.value.toLowerCase())
      );

      this.setState({
        isLoading: false,
        results: searchResults,
      });
    }, 300);
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            input={{ icon: 'search', iconPosition: "left"}}
            loading={isLoading}
            placeholder="Search movies ..."
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
