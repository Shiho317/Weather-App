import React from 'react';
import ReactPlayer from 'react-player';


export default function Background(props) {
  return (
    <div>
      <div className="background-video">
          <ReactPlayer className="video" playing loop muted url={props.video} type="video/mp4"
          style={{width: "100%", height: "100vh"}}/>
      </div>
    </div>
  )
}
