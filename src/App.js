//Abdijabar Yussuf Mohamed
//HW4

/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  It has the following sub components: IndexBar (which allows the user to browse for and chose articles),
  Article (which diplays the selected Article), EditArticle (which allows the user to edit an existing article)

  The component also maintains state in the form of the current article.
  */

import React, { Component } from 'react';
import data from '../public/seed.json';
import Article from './components/Article.js';
import IndexBar from './components/IndexBar.js';
import EditArticle from './components/EditArticle.js';
import styled from 'styled-components';
//import './App.css';

class App extends Component {
  constructor(){
    super();

    // collate the data into a map divided up into sections
    this.collection = new Map();

    data.forEach((item)=>{
      let label = item.title[0];
      if (this.collection.has(label)){
        this.collection.get(label).push(item);
      }else{
        this.collection.set(label, [item]);
      }
    });

    // initialize the App state
    this.state = {
        mode: 'view' // the main page
    };


this.addMe = ((x,y,z)=>{

    if(this.state.currentArticle){
        //I could not figure out how to efficiently delete old article
        this.collection.get(x[0]).push( {title: x, extract: y, edited: z}); //updates the collection
        this.setState({mode: 'view'}); //sets state to the view mode
    }

});



}


 render() {
    // create the IndexBar
    let indexBar = (<IndexBar collection={this.collection} select={(article)=>this.setState({currentArticle:article})}/>);

    // create the article
    // Note that the insertion of Article is conditional on our having
    // a current article available


let article ;
    if (this.state.currentArticle){
      article = (<Article article={this.state.currentArticle}/>);
    }else{
      article = (<p></p>);
    }


    //New Article Button

let NewArticleButton = (
        <button type="button"  onClick = {(evt)=>this.setState({mode: 'new', currentArticle: null})}>New Article</button>
    );



// this creates the new article
let myAdder;
        myAdder = (<EditArticle readyToView = {()=>this.setState({mode:'view'})}
         addInfo = {this.addMe}
         editorInfo = {this.state.currentArticle}
         deleteArticle = {this.deleteArticle}

        />);


//Edit Article button
let editButton;

    if(this.state.currentArticle){
      editButton = (<input type="button" value="Edit Article" onClick = {(evt) =>
          this.setState({mode: 'edit'})}
          editInfo={(article)=>this.setState({currentArticle:article})}


  />);
   }

    else{
      editButton = (<p></p>);
    }







//sets the page layout depending on the chosen mode

if(this.state.mode === 'new'){
      return(
        <div className="App">
        <h3> Add New Article </h3>
        {myAdder}
        </div>
      );
    }

    else if(this.state.mode === 'edit'){
      return(
        <div className="App">
        <h3> Edit Article </h3>
        {myAdder}
        </div>
      );
    }


    else{

    return (
      <div className="App">
        <Title>Simplepedia</Title>
        {NewArticleButton}
        {indexBar}
        {article}
        {editButton}

      </div>

    );
  }
}



}

const Title = styled.h1`
    text-align: center;
`;

export default App;
