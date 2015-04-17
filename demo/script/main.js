// Put data in text area
  var textarea = document.getElementById("code");
  textarea.value = "if(true)\n    alert(123)";

  // Initiate codemirror from that text area
  var editor = CodeMirror.fromTextArea(textarea, {
    mode: "javascript",
    tabSize: 4,
    lineNumbers: true,
    lineWrapping: true,
    keyMap: "sublime",
    theme: "loop-dark",
  });

  var output = document.getElementById("output");
  output.value = "//start editting to see the transpiled result"

  // Initiate codemirror from that text area
  var outputEditor = CodeMirror.fromTextArea(output, {
    mode: "javascript",
    tabSize: 4,
    lineNumbers: true,
    lineWrapping: true,
    keyMap: "sublime",
    theme: "loop-dark",
  });
  
//demo
editor.on("change", function(){
  outputEditor.setValue(transpile(editor.getValue()))
})

