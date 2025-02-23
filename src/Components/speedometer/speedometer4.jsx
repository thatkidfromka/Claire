import { render } from "@testing-library/react";
import React from "react";
import "./engine.scss";
import Pie from "../testfield/pie";
import { useState, useEffect, AnimationEvent} from "react";
import styled, { keyframes } from 'styled-components';
import notification from "./notification.mp3";
import speed120 from "./120.mp3"
import Claire from "../Claire";
import Claire_gif from "../../img/Claire.gif"
import Claire_jpg from "../../img/claire.jpg";
import { SpeedometerWrapper } from "../testfield/SpeedometerWrapper";

function Speedometer(dataFromParent){

// set the start scenario: startspeed and delta t (time horizon predicition)

const startspeed = 0;
let predicition_horizon = 5;

// acceleration can change over time, that's why it is a UseState
// angles for the needles in the speedometer(alpha = currentspeed)
// beta is the predicited speed
// notifications show the current status and alarms in the dashboard
// animationtime and audiocounter exist to make the animation more stable
const [acceleration,setAcceleration] = useState(1.5);
const [alpha,setAlpha] = useState(60);
const [beta,setBeta] = useState(180);
const [notifications,setNotifications] = useState("Set speed to 120 km/h")
const [audiocounter, setAudiocounter] = useState(0);
const [animationtime, setAnimationtime] = useState(10);
const [speed,setSpeed] = useState(-0.33);
const [speed1, setSpeed1] = useState(0);
const [start, setStart] = useState(270);

const [level, setLevel] = useState(0);
const [showSpeed, setShowSpeed] = useState(true);
const [showAudio, setShowAudio] = useState(true);
const [showNotification, setShowNotification] = useState(false);
const [showGif, setShowGif] = useState(false);
const [color, setColor] = useState("green");
const [level1audio, setLevel1audio] = useState(true);



function showlevel(level){
	if(level==2){
		setShowAudio(false);
	}
	if(level == 3){
		setShowSpeed(false);
		setShowAudio(false);
	}
	if(level == 4){
		setShowSpeed(false);
		setShowAudio(false);
		setShowNotification(false)
	}
}

function play(){
	new Audio(notification).play()
	setAudiocounter(1);
}
function play120(){
	new Audio(speed120).play()
	
}

//vector graphics

const size = 475;
const strokeWidth = 30;
// startangle = 150 means alpha = 60
const startAngle = 150;
// basic calculations to add the stroke
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = circumference - (speed) * circumference;
console.log(strokeDashoffset)
//const [strokeDashoffset, setStrokeDataoffset] = useState(circumference - ((180-160)*100/360) * circumference)



//the useEffect code is executed when the traffic light appears or the car stops
useEffect(() =>{
	
	showlevel(level);
	if(dataFromParent.dataFromParent.traffic==true){
		
		
		setBeta(60);
		setStart(150);
		setSpeed(0);
		setAcceleration(0);
		setAnimationtime(4);
		//make sure audio is only played once
		setNotifications("Red light detected")
		setColor("red");
		
		/*setTimeout(()=>{
			setSpeed(-0.33);
			setStart(270);},4000);*/
		
		
	}
	else{
		
		setBeta(180);
		setAnimationtime(10);
		setNotifications("Set speed to 120 km/h")
		setColor("green");
		setSpeed(0);
		setTimeout(()=>{
			setAnimationtime(0.5);
			setSpeed(0.33);
			setStart(150);
			setAlpha(180);},11500);
		
	}
	if(dataFromParent.dataFromParent.stop==true){
		setAlpha(60);
		setAnimationtime(1);
		setTimeout(()=>{
			setSpeed(-0.33);
			setStart(270);},3000);
			
	}
	
	 // speed = 0 means 0 degree ciricle, speed = 100 means full 360
  // calculate the progress to show stroke width in simple word
  //setStrokeDataoffset(circumference - ((beta-alpha)*100/360) * circumference);

},[dataFromParent.dataFromParent.traffic, dataFromParent.dataFromParent.stop])





//animation for red needle (current speed)
const rotate = keyframes`
to {
  transform: rotate(${beta-alpha}deg);
}
`

const InfiniteRotate = styled.div`
animation: ${rotate} ${animationtime}s linear;
animation-fill-mode: forwards;
position: absolute;
top: 50%;
left: 50%;
`
const accelerate = keyframes`
0% {
  stroke dashoffset:- 936.6658496677967;
}
100% {
	stroke-dashoffset:0;
}
`
const brake = keyframes`
0% {
  stroke dashoffset:936.6658496677967;
}
100% {
	stroke-dashoffset:0;
}
`


    return(
        <div className="engine">
        
		
        <div className="dashboard">
			
  
			<h2 style={{color:"#000000", fontFamily:"Arial"}}>q</h2>
			<h2 style={{color:"#000000", fontFamily:"Arial"}}>q</h2>
			<h2 style={{color:"#000000", fontFamily:"Arial", fontSize:40}}>q</h2>
			<div style={{color:"white",}}>

	        </div>
	        <div className="meter meter--speed">
				
				

				<img className="dot" alt={"..."} src={showGif ? Claire_gif: Claire_jpg}></img>
			

				{/* Enter the acceleration half round component here.  */}
				<div  style={{left: (50 - (50 - 10) * Math.sin(180 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(180 * (Math.PI / 180))) + "%",color:"green"}}></div>
				
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(60 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(60 * (Math.PI / 180))) + "%"}}>0</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(80 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(80 * (Math.PI / 180))) + "%"}}>20</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(100 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(100 * (Math.PI / 180))) + "%"}}>40</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(120 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(120 * (Math.PI / 180))) + "%"}}>60</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(140 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(140 * (Math.PI / 180))) + "%"}}>80</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(160 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(160 * (Math.PI / 180))) + "%"}}>100</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(180 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(180 * (Math.PI / 180))) + "%"}}>120</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(200 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(200 * (Math.PI / 180))) + "%"}}>140</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(220 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(220 * (Math.PI / 180))) + "%"}}>160</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(240 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(240 * (Math.PI / 180))) + "%"}}>180</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(300 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(260 * (Math.PI / 180))) + "%"}}>200</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(300 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(280 * (Math.PI / 180))) + "%"}}>220</div>
				<div className="grad" style={{left: (50 - (50 - 10) * Math.sin(300 * (Math.PI / 180))) + "%", top: (50 + (50 - 10) * Math.cos(300 * (Math.PI / 180))) + "%"}}>240</div>

				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(60 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(60 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (60 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(80 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(80 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (80 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(100 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(100 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (100 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(120 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(120 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (120 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(140 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(140 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (140 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(160 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(160 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (160 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(180 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(180 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (180 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(200 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(200 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (200 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(220 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(220 * (Math.PI / 180))) + "%",transform: "translate3d(-50%, 0, 0) rotate(" + (220 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(240 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(240 * (Math.PI / 180))) + "%", transform: "translate3d(-50%, 0, 0) rotate(" + (240 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(260 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(260 * (Math.PI / 180))) + "%",transform: "translate3d(-50%, 0, 0) rotate(" + (260 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(280 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(280 * (Math.PI / 180))) + "%",transform: "translate3d(-50%, 0, 0) rotate(" + (280 + 180) + "deg)"}}></div>
				<div className="grad-tick" style={{left: (50 - 50 * Math.sin(300 * (Math.PI / 180))) + "%", top: (50 + 50  * Math.cos(300 * (Math.PI / 180))) + "%",transform: "translate3d(-50%, 0, 0) rotate(" + (300 + 180) + "deg)"}}></div>

				<div style={{transform: "rotate("+alpha+"deg)",position: "absolute",top: "50%",left: "50%"}}>
				<InfiniteRotate>
					<div className="needle"></div>
				</InfiniteRotate>
				</div>

				
			</div>
			
        </div>
		


        
        </div>
    );
	
}


export default Speedometer;