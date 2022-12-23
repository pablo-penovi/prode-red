import React, { Fragment, ReactNode } from 'react';


const DEFAULT_TITLE_COLOR = 'text-theme-light'
const DEFAULT_SUBTITLE_COLOR = 'text-real-red-100'
export interface SectionTitleProps {
  title: string,
  subtitle?: string,
  titleColor?: string,
  subtitleColor?: string
}

const SectionTitle = ({title, subtitle, titleColor, subtitleColor}: SectionTitleProps) => {
  return (
    <div className={`flex flex-col justify-center, align-middle w-full mb-10 ${titleColor || 'text-theme-light'}`}>
      <h3 className="text-center text-xl mb-1">{title}</h3>
      <span className={`text-center text-md ${subtitleColor || 'text-real-red-100'}`}>{subtitle}</span>
    </div>
  );
};

export default SectionTitle;