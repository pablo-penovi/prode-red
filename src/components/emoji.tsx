import React from 'react';

const Emoji = (props: {
  emojiCode?: string,
  label?: string
}) => {
  return (
    props?.emojiCode && 
    <span
        className='emoji'
        role='img'
        aria-label={props.label || ''}
    >
        {props.emojiCode}
    </span>
  );
};

export default Emoji;