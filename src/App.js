import React from 'react';
import logo from './logo.svg';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { TextField, Button } from '@material-ui/core';
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

const ADD_REVIEW = gql`
  mutation ADD_REVIEW($title: String, $text: String!) {
    addReview( title:$title, text:$text ) {
      id
      title
      text
    }
  }
`; 


function App(props) {
  const { classes } = props;
  let titleInput, textInput;
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
        <Mutation mutation={ADD_REVIEW} refetchQueries={[{query: GET_REVIEWS}]}>
        {(addReview) => { 
          return (
            <form noValidate autoComplete="off"
              onSubmit={(e)=>{
                e.preventDefault();
                addReview({ variables: {title: titleInput, text: textInput} });
                titleInput = '';
                textInput = '';
              }}
            >
              <div>
                <TextField 
                  label="Title" 
                  fullWidth 
                  margin="dense"
                  variant="outlined" 
                  size="small" 
                  value={titleInput}
                  onInput={ e=>titleInput=e.target.value}
                />
                <TextField 
                  label="Text"
                  fullWidth
                  margin="dense"
                  variant="outlined" 
                  multiline={true} 
                  rows={5} 
                  value={textInput}
                  onInput={ e=>textInput=e.target.value}
                />
              </div>
              <Button
                fullWidth
                size="large"
                type="submit"
              > Post </Button>
            </form>
          );
        }}
        </Mutation>
      </header>
    </div>
  );
}

export default withStyles(styles)(App);
