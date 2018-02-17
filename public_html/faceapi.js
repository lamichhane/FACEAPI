/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function () {
    var btn1 = document.getElementById('btn1');
    //sample api key from tutes
    var apikey1 = 'f0c42c2f14c5423a99c17e9be352c094';


    document.getElementById("btn1").addEventListener("click", analyzeImage);
    function clearField() {
        document.getElementById('imgUrl').value = '';
        document.getElementById('age').value = '';
        document.getElementById('gender').value = '';

    }
    function analyzeImage() {
        var imageUrl = document.getElementById('imgUrl').value;

        var myHeader = new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': apikey1
        });

        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender"
        };

        var esc = encodeURIComponent;
        var query = Object.keys(params)
                .map(k => esc(k) + '=' + esc(params[k]))
                .join('&');

        var reqBody = {
            "url": imageUrl
        };

        var initObject = {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: myHeader
        };


        var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?' + query, initObject);
        clearField();
        fetch(request).then(function (response) {
            if (response.ok) {
                
                return response.json();
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }).then(function (response) {
            if (response.length === 0) {
                return Promise.reject("Non-Human");
            }
            
            var info = response[0].faceAttributes;
            
            document.getElementById('validresult').style.display='block';
            document.getElementById('invalidresult').style.display='none';
            document.getElementById('age').innerHTML= info.age;
            document.getElementById('gender').innerHTML=info.gender;
            removeImg();
            var elem=createElement(imageUrl);
            document.getElementById("respImage").appendChild(elem);
            
            
        }).catch(function (err) {
            if (err === "Non-Human") {
               removeImg();
                document.getElementById('validresult').style.display='none';
                document.getElementById('invalidresult').style.display='block';
                document.getElementById('age').innerHTML= '';
                document.getElementById('gender').innerHTML='';
                var elem=createElement(imageUrl);
               document.getElementById("respImage").appendChild(elem);
            } else {
                
            }
        })
    }
    ;

function createElement(imageUrl){
            var elem = document.createElement("img");
            elem.setAttribute("src", imageUrl);
            elem.setAttribute("height", "200");
            elem.setAttribute("width", "200");
            elem.setAttribute("alt", "Image");
            return elem;
           
}
function removeImg(){
     var imgcount=document.getElementsByTagName("img").length;
              
                if (imgcount >0){
                    document.getElementById("respImage").removeChild(document.getElementsByTagName('img')[0]);
                }
}
}
