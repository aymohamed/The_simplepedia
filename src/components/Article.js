/*
  Article.js

  This provides the implementation for the Article coponent.

  The Article simply displays the contents of an article passed down in the props.

  Since it has no state, we can make this a functional component.
*/


import React from 'react';
import styled from 'styled-components';

function Article(props){
    return(
      <ArticleStyled >
      <h3 id="article-title">{props.article.title}</h3>
      <p id="article-text">{props.article.extract}</p>
      <Timestamp>{props.article.edited}</Timestamp>
      </ArticleStyled >
    );
}

Article.propTypes = {
  title:React.PropTypes.string.isRequired,
  extract:React.PropTypes.string.isRequired,
  edited:React.PropTypes.number.isRequired
};


const ArticleStyled = styled.div`
margin:40px;
 `;

//styles the article timestamp
 const  Timestamp = styled.div`
 font-size: small;
  `;

export default Article;
