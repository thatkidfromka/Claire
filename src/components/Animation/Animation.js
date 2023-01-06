import { useState} from "react";
import Grid from '@mui/material/Grid';
import "./animation.css";
import {
  Dashboard,
  DashboardWrapper,
  RoadWrapper,
} from "./Dashboard";
import { Road, TrafficWrapper } from "./Road";
import { Car_Img, Traffic } from "../../assets/exports";
import Speedometer from "../speedometer/speedometer";
import React from "react";

//code from sirarifarid-fiverr
//showTraffic and stopRoad useStates define behavior of animation. (traffic light appears and car stops = road stops)
//traffic light apperars after random time, Then car stops after 4 seconds
function Animation() {
  const [showTraffic, setShowTraffic] = useState(false);
  const [stopRoad, setStopRoad] = useState(false);
  
  React.useEffect(() => {
    const showTraffic = setTimeout(() => {
      setShowTraffic(true);
      
      setTimeout(() => {
        setStopRoad(true);
      }, 4000);
    }, Math.random() * 4 * 2500);
    return () => {
      window.clearTimeout(showTraffic);
    };
  }, []);

  return (
    
    <Grid container column={2}>
        <Grid item xs={4}>
            <Speedometer dataFromParent={{traffic:showTraffic,stop:stopRoad}} />
        </Grid>
        <Grid item xs={4}>
            <Dashboard>
            <img src={Car_Img} />
            <DashboardWrapper>
                {showTraffic && (
                <TrafficWrapper className="traffic">
                    <img src={Traffic} />
                </TrafficWrapper>
                )}
                <RoadWrapper className={stopRoad ? "" : "dashboard_wrapper"}>
                <Road></Road>
                <Road></Road>
                <Road></Road>
                <Road></Road>
                </RoadWrapper>
            </DashboardWrapper>
            </Dashboard>
        </Grid>
    </Grid>
    
  );
}

export default Animation;
