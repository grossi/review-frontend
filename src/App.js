import React from 'react';
import logo from './logo.svg';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './AppStyle';

const GET_REVIEWS = gql`
  query GET_REVIEWS {
    reviews{
      id
      title
      text
    }
  }
`;

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo" />
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
        <form noValidate autoComplete="off">
          <TextField id="standard-basic" label="Standard" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </header>
    </div>
  );
}

export default withStyles(styles)(App);
