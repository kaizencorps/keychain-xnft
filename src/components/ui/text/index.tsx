import * as React from 'react';

interface Props {
  children: string
  className?: string
}

export const SubHeaderText: React.FunctionComponent<Props> = (props) : React.ReactElement =>  <p className={`${props.className} font-blenderpromedium`}>{props.children}</p>;
export const HeaderText: React.FunctionComponent<Props> = (props) : React.ReactElement =>  <p className={props.className}>{props.children}</p>;
export const NormalText: React.FunctionComponent<Props> = (props) : React.ReactElement =>  <p className={props.className}>{props.children}</p>;
export const ThinText: React.FunctionComponent<Props> = (props) : React.ReactElement =>  <p className={props.className}>{props.children}</p>;


