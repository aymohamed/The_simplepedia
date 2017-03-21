//Abdijabar Yussuf Mohamed
//HW4


/*
  IndexBar.js

  This provides the implementation for the IndexBar component.

  The IndexBar has two parts. The first part is a list of the sections available in the data set. Clicking on one of these expands the section part, which is a list of the available titles in the current section.

  The component has two props. The first is a Map which contains all of the articles broken down into sections. The second is a callback which allows the component to specify a "selected article".

  The IndexBar maintains some state in the form of the current section being displayed. No other component cares what section can be seen, so that state can stay local to the IndexBar.

*/
import React, { Component } from 'react';
import styled from 'styled-components';


/*
  This implements the Sections component.
  props:
    sections - the list of the available sections
    setSection - a callback for when a section has been selected
*/
//styling section-list ul

const SectionListUl = styled.ul`
    list-style: none;
`;

//styling section-list li

const SectionListLi = styled.li`
   display:inline;
   padding: 5px;
   font-weight: bold;
`;





function Sections(props){
  // sort the section names
  const sectionNames = Array.from(props.sections).sort();

  // build the list of sections
  const sections = sectionNames.map((section)=>{
    return (<SectionListLi key={section} onClick={()=>{props.setSection(section)}}>{section}</SectionListLi>);
  });

  return(
    <div id="section-list">
      <SectionListUl>{sections}</SectionListUl>
    </div>
  );
}

/*
  This implements the list of titles.
  props:
    articles - the list of articles to be displayed
    select - the callback to indicate which title has been selected

    Note that this doesn't know about all articles: just the ones that are passed to it.
*/
function Titles(props){
  // sort the articles by title
  const articles = props.articles;
  articles.sort((a1,a2) => a1.title.localeCompare(a2.title));

  // assemble the list of titles
  const titles = articles.map((article)=>{
    return (<SectionListLi key={article.title} onClick={()=>{props.select(article)}}>{article.title}</SectionListLi>);
  });


  return (
    <div>
    <SectionListUl>{titles}</SectionListUl>
    </div>
  )

}


class IndexBar extends Component{
  constructor(){
    super();
    this.state = {};
  }
  render(){
    // creat the Section component
    const sections = (<Sections sections={this.props.collection.keys()} setSection={(section)=>{this.setState({section:section}); this.props.select()}} />);


    // conditionally create the title list if we have a selected section
    let titles;
    if (this.state.section){
      const articles = this.props.collection.get(this.state.section);
      titles = (<Titles articles={articles} select={this.props.select}/>);
    }else{
      titles = (<p>Select a section</p>);
    }


    return(
      <div>
        <div id="section-list">
      <SectionListUl>{sections}</SectionListUl>
      </div>
      {titles}
      </div>
    );
  }
}



export default IndexBar;
