//import logo from './logo.svg';
import './App.css';
import React from 'react'
import marked from "marked";
import prism from "prismjs";
import "prismjs/themes/prism.css"
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = prism;
   
    
    return hljs.highlight(code,prism.languages.javascript, 'javascript');
  }
});
const renderer = {
  image(href, title, text){
    return`<img src=${href} class="img-fluid">`;
  }
  
};


marked.use({renderer});
const html = marked(placeholder);

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        data: placeholder,
        previewmaximized: false,
        editmaximized: false
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize=this.handlePreviewMaximize.bind(this);
  };    
  handleChange(a){
    this.setState({
      data: a.target.value
    })
  };
  handleEditorMaximize(){
    this.setState({
      editmaximized: !this.state.editmaximized
    })
  };
  handlePreviewMaximize(){
    this.setState({
      previewmaximized:!this.state.previewmaximized
    })
  };

  
  
  render() {
    let classes = []
   
    if(this.state.editmaximized === true){
      classes = ['edit maximized','preview hide','bi bi-arrows-angle-contract'];
      
    } else if(this.state.previewmaximized === true){
      classes = ['edit hide','prev maximized','bi bi-arrows-angle-contract'];

    }else{
      classes= ["edit ","prev", "bi bi-arrows-move"];
    };
    //console.log(classes)
    return (

      <div className="App"  >
        <div className="App-header" >
          <div className={classes[0]} >
            <Toolbar
              text='Editor'
              icon={classes[2]}
              onClick={this.handleEditorMaximize}

            />
            <Edit 
              data={this.state.data} 
              onChange={this.handleChange} 
            />
          </div>  
          <div className={classes[1]} >
            <Toolbar
              text='Preview'
              icon={classes[2]}
              onClick={this.handlePreviewMaximize}
            />
            <Preview
              data={this.state.data} 
            />
          </div>
          
           
        </div>
      </div>
    );
  }
};
const Toolbar = (props) => {
  //console.log(props.onClick)
  return(
  <div className="toolbar">
    <i className="bi bi-file-text-fill" />
      {props.text}
    <i className={props.icon} onClick={props.onClick}/>
  </div>
  );
};

const Edit =(props)=> {
  return(
    <textarea  id="editor"type="text" value={props.data} onChange={props.onChange}></textarea>
  );
};
const Preview=(props)=>{
  return (

    <div className="text" dangerouslySetInnerHTML={{__html: marked(props.data, { html: html })}} id="preview"/>
   
  )
  
}


export default App;
/*marked(props.data, { html: html }

{__html: html}  */
/**/