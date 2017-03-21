
//Abdijabar Yussuf Mohamed
//HW4


import React, { Component } from 'react';

 class EditArticle extends Component {
  constructor(props) {
    super(props);
if(this.props.editorInfo){
    this.state = {
      title: this.props.editorInfo.title,
      body: this.props.editorInfo.extract
  }
}else{
    this.state = {
      title: '',
      body: ''
  };

};


  }

 render(){
        let newTitle = this.state.title;
        let newBody = this.state.body;
        //sets date to current date/time
        let today = new Date();
        today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " " + today.getHours() + ":" + today.getMinutes();



      return (
          <div>
        <input type="text"
           id = "newTitleAdded"
            value={newTitle}
            placeholder = 'title here'
            onChange={(event)=>{
                this.setState({title:event.target.value})

            }}
            ></input>
            <p>Hello world</p>



            <textarea
            id = "newArticleContentAdded"
            rows="9" cols="90"
            value={newBody}
            placeholder = "add article info"
            onChange={(event)=>{
                this.setState({body:event.target.value})
            }}
            ></textarea>




            <div class="modal-footer">
          <button type="button"
                  onClick={(evt)=>{
                    if(document.getElementById('newTitleAdded').value === ''){
                      alert("Without title, you will not proceed!");
                    }
                    else{
                        this.props.addInfo(newTitle, newBody, today)
                        this.props.readyToView()

                  }
                          }
                  }>Save</button>

             <button type="button" onClick={()=>{this.props.readyToView()()}}>Cancel</button>
             </div>
            </div>
        );
    }
}


export default EditArticle;
