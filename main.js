 var p1="";
 var p2="";

Webcam.set({
    width:350,
    height:330,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("snap").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("ml5.version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/utSP-bhh7/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model_loaded!");
}


function speak(){
    var synth= window.speechSynthesis;
    speak_data1= "The first prediction " + p1;
    speak_data2= "The second prediction " + p2;
    var utterThis= new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function predict_action(){
    img= document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
p1=results[0].label;
p2=results[1].label;
speak();
if(results[0].label=="namaste"){
    document.getElementById("update_emoji").innerHTML='<img src="namaste.jpg">';
}
else if(results[0].label=="victory"){
    document.getElementById("update_emoji").innerHTML='<img src="victory.gif">';
}
else if(results[0].label=="good job"){
    document.getElementById("update_emoji").innerHTML='<img  src="download.jpg">';
}
if(results[1].label=="namaste"){
    document.getElementById("update_emoji2").innerHTML='<img src="namaste.jpg">';
}
else if(results[1].label=="victory"){
    document.getElementById("update_emoji2").innerHTML='<img src="victory.gif">';
}
else if(results[1].label=="good job"){
    document.getElementById("update_emoji2").innerHTML='<img  src="download.jpg">';
}
}
}