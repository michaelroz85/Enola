import React from "react";

function SvgWave() {
  return (
    <svg
      className="home-page-wave"
      width="100vw"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 320"
    >

      <g>
        <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5EC22B" />
          <stop offset="100%" stopColor="#008000" />
        </linearGradient>
        <path id="gradient" style={{ fill: 'url(#linear-gradient)' }} className="cls-200" />
      </g>
      <path
        fill='url(#linear-gradient)'
        fillOpacity="0.5"
        d="M0,32L80,64C160,96,320,160,480,165.3C640,171,800,117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        margin="0 0 -50 0"
      />

    </svg>
  );
}

export default SvgWave;

//  <g>
//         <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" >
//           {/* <stop offset="0.14" stop-color="#2f343b" stop-opacity="0" /> */}
//           <stop offset="0.2" stopColor="#5EC22B" stopOpacity="0.91" />
//           {/* <stop offset="0.5" stop-color="#008000" stop-opacity="0.73" />
//           <stop offset="0.8" stop-color="#98D877" stop-opacity="1" /> */}
//         </linearGradient>*
//         <path id="gradient" style={{ fill: 'url(#linear-gradient)' }} className="cls-200"/>
//       </g>
//       <path
//       background=" linear-gradient(red, yellow)"
//         fill='url(#linear-gradient)'//"#5EC22B"
//         fillOpacity="0.5"
//         d="M0,32L80,64C160,96,320,160,480,165.3C640,171,800,117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
//         margin="0 0 -50 0 "
//       ></path> 
