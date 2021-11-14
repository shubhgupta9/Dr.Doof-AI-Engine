import React from "react";
import MicIcon from "@material-ui/icons/Mic";

function search() {
  return (
    <div class="p-8">
      <div class="bg-gray-800 opacity-80 flex items-center rounded-full shadow-xl border-2">
        {/* <input
          className="textColor rounded-l-full bg-gray-800 w-full h-1/6 py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search"
        /> */}
        <input
          className="textColor rounded-l-full bg-gray-800 w-full h-1/6 py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="action"
          type="text"
          placeholder="Search"
        />

        <div className="p-4">
          <button
            className="bg-red-500 text-white rounded-full p-2 hover:bg-indigo-400 focus:outline-none w-7 h-7 flex items-center justify-center"
            onClick={() => runSpeechRecognition()}
          >
            <MicIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function runSpeechRecognition() {
  // get output div reference
  // var output = document.getElementById("search");
  // get action element reference
  var action = document.getElementById("action");
  // new speech recognition object
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    const permissions = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    permissions
      .then((stream) => {
        action.value = "listening, please speak...";
      })
      .catch((err) => {
        console.log(`${err.name} : ${err.message}`);
      });
  };

  recognition.onspeechend = function () {
    action.value = "stopped listening, hope you are done...";
    recognition.stop();
  };

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    action.value = transcript;
    var docx = window.nlp(transcript);

    console.log(docx.data());
    // Sentences
    console.log(docx.sentences().data());

    // Tokenization
    console.log(docx.sentences().terms().out("array"));

    // Part of Speech Tagging  + Entities
    console.log(docx.sentences().terms().out("tags"));

    // Entity Recognition NER

    console.log(docx.topics().data());
    var listNouns = [];
    for (var i = 0; i < docx.nouns().json().length; i++) {
      listNouns.push(docx.nouns().json()[i].text);
    }
    var listVerbs = [];
    for (var i = 0; i < docx.verbs().json().length; i++) {
      listVerbs.push(docx.verbs().json()[i].text);
    }
    //  Visualforce.remoting.Manager.invokeAction('{!$RemoteAction.SpeechRecog.getObject}', listNouns,listVerbs, JSON.stringify(docx.sentences().terms().out('tags')),
    //                               function(result,event){
    //                                   if(event.status) {
    //                                   alert(result[0].expr0);
    //                                   }});
    action.classList.remove("hide");
  };

  // start recognition
  recognition.start();
}

export default search;
