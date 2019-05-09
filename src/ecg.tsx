import React, { memo } from 'react';

import classNames from 'classnames';

const ecg: React.FC<{
  requesting?: boolean;
  error?: boolean;
  animationTime?: number;
}> = props => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 600 300"
    className={classNames({
      requesting: props.requesting,
      errored: props.error
    })}
  >
    <path
      style={{
        animation: `pulse ${props.animationTime || 4}s infinite linear`
      }}
      d="
         M0,151h34.1c0.2,0,0.4-0.1,0.5-0.3l1.8-5.3c0.2-0.5,0.9-0.4,1,0.1l1.1,5.9c0.1,0.5,0.9,0.5,1,0l6.4-37
	c0.1-0.6,0.9-0.5,1,0l6.7,55c0.1,0.6,0.9,0.6,1,0l3.9-20c0.1-0.5,0.9-0.5,1,0l0.5,2.3c0.1,0.5,0.9,0.5,1,0l2.5-12.7
	c0.1-0.5,0.9-0.5,1,0l1.9,9.3c0,0.2,0.1,0.2,0.1,0l0.3-1.4c0-0.1,0.1-0.1,0.2,0l1.3,3.9c0.1,0.2,0.3,0.3,0.5,0.3H600
         "
    />
    <path
      style={{
        animation: `pulse ${props.animationTime || 4}s infinite linear`
      }}
      d="
         M0,150h35.1c0.2,0,0.4-0.1,0.5-0.3l1.8-5.3c0.2-0.5,0.9-0.4,1,0.1l1.1,5.9c0.1,0.5,0.9,0.5,1,0l6.4-37
	c0.1-0.6,0.9-0.5,1,0l6.7,55c0.1,0.6,0.9,0.6,1,0l3.9-20c0.1-0.5,0.9-0.5,1,0l0.5,2.3c0.1,0.5,0.9,0.5,1,0l2.5-12.7
	c0.1-0.5,0.9-0.5,1,0l1.9,9.3c0,0.2,0.1,0.2,0.1,0l0.3-1.4c0-0.1,0.1-0.1,0.2,0l1.3,3.9c0.1,0.2,0.3,0.3,0.5,0.3H600"
    />
  </svg>
);

export default memo(ecg);
