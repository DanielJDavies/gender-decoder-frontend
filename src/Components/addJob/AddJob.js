import React from "react";
import './addJob.css';
import eqIcon from './equality-people.png'
import axios from 'axios';

export default function AddJob() {
  const [firstLoad, setLoad] = React.useState(true);
  const [content, setContent] = React.useState("");

  const handleContentChange = event => setContent(event.target.value);
  const [output, setOutput] = React.useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const toInput = {content};
    axios({
      method: 'post',
      url: '/texts',
      data: {
        text: toInput.content,
      }
    }).then(res=>{
      console.log(res);
      setOutput(res.status===200? "Job ad sucessfully added" : "Job ad failed");
    });
  };

  const handleAnalyze = event => {
    event.preventDefault();
    const toInput = {content };

    axios({
      method: 'post',
      url: '/analyze',
      data: {
        text: toInput.content,
      }
    }).then(res=>{
      console.log(res);
      const result = res.data;
      const wordArray = result.text.split(" ");
      const bitMapArray = result.bitMap.split('');
      let toOutput = "This job ad is neutral.";
      if (result.countFeminine>0 || result.countMasculine >0){
        toOutput = wordArray.map((word,index)=>{
          const style = bitMapArray[index];
          return(
          <mark className={style} key={index}>{word} </mark>
          );
        });
      } 
      console.log(toOutput);
      setOutput(res.status===200?toOutput: "Text analysis failed");
    });
  }

  if (firstLoad) {
    setLoad(false);
  }

  return (
      <div>
        <div className="container">
          <div className="box">
            <img src={eqIcon} alt="Equality icon" className="icon"/>
          </div>
          <div className="box">
            <form className="form" noValidate>
              <textarea id="ad" name="ad"
                    placeholder="Paste your job ad here"
                    onChange={handleContentChange}/>
              <button className="button" onClick={handleAnalyze}>
                    Analyze
              </button>
              <button className="button" onClick={handleSubmit}>
                    Save
              </button>
            </form>
          </div>
          <div className="box">
            <p>{output}</p>
          </div>
       </div>
      </div>
  );
}