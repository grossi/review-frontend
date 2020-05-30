import React from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_REVIEWS = gql`
  query GET_REVIEWS {
    reviews{
      id
      title
      text
    }
  }
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Query query={GET_REVIEWS}>
            {({ error, data, loading }) => {
              if( error ) {
                console.log("er", error);
                return null;
              }
              if( loading ) return null;
              return (
                <>
                  {data.reviews.map((review, i) => (
                    <div key={i}>
                      <p>{review.title}</p>
                      <p>{review.text}</p>
                    </div>
                  ))}
                </>
              )
            }}
          </Query>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
