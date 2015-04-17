transpile = function(input){
    var steps = [indentToBracketString];
    var output = input;
    for(var i=0; i< steps.length; i++) output = steps[i](output);
    return output;
}

function indentToBracketString(input) {
    //todo: handle comments, string, and multiline arrays
    var output = '';
    var indent = [''];
    var lines = (input + "\n;").split("\n")
    for(var i=0; i < lines.length; i++){
        var line = lines[i]
        if (/^\s*$/.test(line)) output += line + "\n"
        else {
            for (var firstNonWs = 0; firstNonWs < line.length; firstNonWs++) if (line.charAt(firstNonWs) !== ' ' && line.charAt(firstNonWs) !== '\t') break;
            var lineWs = line.substring(0, firstNonWs);
            var lineBody = line.substring(firstNonWs);
            if(lineWs !== indent[indent.length - 1]) {
                //look for nearest match
                for(var nearest=indent.length - 1; nearest > -1; nearest--) if(lineWs.indexOf(indent[nearest]) == 0) break;
                var indentLevel = (indent.indexOf(lineWs) < 0 && nearest > -1) ? nearest + 1 : indent.indexOf(lineWs);
                //close brackets
                while (indent.length - 1 > indentLevel) {
                    indent.pop();
                    output = output.slice(0, -1) + " }\n";
                }
                //open brackets
                if(lineWs !== indent[indent.length - 1]){
                    indent.push(lineWs);
                    output = output.slice(0, -1) + " {\n";
                }
            }
            output += line + "\n";
        }
    }
    return output.slice(0,-2);
}
