
var text, parser, xmlDoc;

fetch(document.URL + `xml/data.xml`).then(function(response) {
    response.text().then(function(text) {
        var ul = document.getElementById("demo");
        var li;

        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text,"text/xml");

        var Leaders = xmlDoc.getElementsByTagName("Leader"); //outputs array of employees
        for(i=0; i < Leaders.length; i++){
            var _Data = ``;
            li = document.createElement("li");
            for(j=0; j < Leaders[i].children.length; j++)
            {
                _Data = _Data + ` ` + Leaders[i].children[j].textContent;
            }
            console.log(_Data);
            li.appendChild(document.createTextNode(_Data));
            ul.appendChild(li);
        }
    });
  });






    
    function xmlToString(xmlData) { 

        var xmlString;
        //IE
        if (window.ActiveXObject){
            xmlString = xmlData.xml;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else{
            xmlString = (new XMLSerializer()).serializeToString(xmlData);
        }
        return xmlString;
    }   