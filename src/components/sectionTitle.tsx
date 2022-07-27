import React, { Fragment, ReactNode } from 'react';

export interface SectionTitleProps {
  title: string,
  subtitle?: string
}

const SectionTitle = ({title, subtitle}: SectionTitleProps) => {
  return (
    <div className="flex flex-col justify-center, align-middle w-full mb-10 text-theme-light">
      <h3 className="text-center text-xl mb-1">{title}</h3>
      <span className="text-real-red-100 text-center text-md">{subtitle}</span>
    </div>
  );
};

export default SectionTitle;