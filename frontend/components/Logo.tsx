interface LogoInterface {
  color: string;
  width: string;
  height: string;
}

export default function Logo({ width, height, color }: LogoInterface) {
  return (
    <svg width="200px" height="54px">
      <path
        fill={color}
        d="M119.42,67.93,149.81,37.5,112.36,0,82,30.43a10,10,0,0,1-14.13,0L37.45,0,0,37.5,30.39,67.93a10,10,0,0,1,0,14.14L0,112.5,37.45,150l30.39-30.43a10,10,0,0,1,14.13,0L112.36,150l37.45-37.5L119.42,82.07A10,10,0,0,1,119.42,67.93ZM82,105.43a10,10,0,0,1-14.13,0L44.52,82.07a10,10,0,0,1,0-14.14L67.84,44.57a10,10,0,0,1,14.13,0L105.3,67.93a10,10,0,0,1,0,14.14Z"
      />
      <path fill={color} d="M186.77,38.2V30.7h5.89v7.5Zm0,62.5v-50h5.89v50Z" />
      <path
        fill={color}
        d="M212.33,100.7h-5.89v-50h5.89v3.7a33.31,33.31,0,0,1,16.28-4.7q10,0,13.34,5.3t3.34,19.4v26.3h-6v-26q0-11.51-2.2-15.55t-9.39-4a27.9,27.9,0,0,0-7.34,1,31,31,0,0,0-5.94,2.15l-2.1,1Z"
      />
      <path
        fill={color}
        d="M264.37,100.7h-5.9V28.5h5.9v43l8.49-.2,15.38-20.6h6.89L278.05,73.6l17.88,27.1h-7L273,76.6l-8.59.2Z"
      />
      <path
        fill={color}
        d="M307.31,55.4q4.59-5.59,15.68-5.6t15.68,5.6q4.59,5.6,4.6,20.2t-4.1,20.3q-4.1,5.7-16.18,5.7t-16.18-5.7q-4.1-5.7-4.09-20.3T307.31,55.4Zm6.84,41.85a34.55,34.55,0,0,0,17.68,0,9.07,9.07,0,0,0,5-4.3,19.59,19.59,0,0,0,2.24-7.1,94.22,94.22,0,0,0,.5-11q0-12.6-3.49-17.2T323,53q-9.58,0-13.08,4.6t-3.5,17.2a94.22,94.22,0,0,0,.5,11,19.6,19.6,0,0,0,2.25,7.1A9,9,0,0,0,314.15,97.25Z"
      />
      <path
        fill={color}
        d="M361.34,53.9v46.8h-3.49V53.9H351V50.7h6.89V44.6q0-10.5,2.79-14.15t9.89-3.65l9.19.3v3.1c-4.26-.13-7.33-.2-9.19-.2q-5.29,0-7.24,3t-2,11.75v6h16.18v3.2Z"
      />
      <path
        fill={color}
        d="M385.61,123.2V50.7h5.89v3.8a30.85,30.85,0,0,1,16.43-4.8q8.64,0,12.89,6.1t4.24,19.85q0,13.75-5,19.9t-16.58,6.15a54.39,54.39,0,0,1-12-1.3v22.8Zm21.07-68.1a25.71,25.71,0,0,0-7.09,1.1,27.66,27.66,0,0,0-5.89,2.3l-2.2,1.1V95.2a69.1,69.1,0,0,0,11.79,1.2q8.58,0,12.08-4.85t3.5-16q0-11.14-3.05-15.8T406.68,55.1Z"
      />
      <path fill={color} d="M436.65,38.2V30.7h5.89v7.5Zm0,62.5v-50h5.89v50Z" />
      <path
        fill={color}
        d="M451.23,50.7h6.69L471.1,71.3l13.19-20.6H491L474.7,75.6l16.18,25.1h-6.59L471.1,80.2l-13.18,20.5h-6.69l16.08-25Z"
      />
      <path
        fill={color}
        d="M531.43,95.7l3-.3.2,4.9a159.74,159.74,0,0,1-19.07,1.4q-10.78-.11-15.08-6.4t-4.3-19.4q0-26.21,20.58-26.2,9.88,0,14.78,5.65t4.89,18.05l-.2,4.8h-34q0,9.19,3.14,13.65T516.2,96.3Q523.83,96.3,531.43,95.7ZM502.27,73.2h28.16q0-9.9-3.25-14.1T516.8,54.9q-7.14,0-10.84,4.35T502.27,73.2Z"
      />
      <path fill={color} d="M548.11,100.7V28.5H554v72.2Z" />
    </svg>
  );
}
