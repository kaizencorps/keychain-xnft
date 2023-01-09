import React, { FC, ReactElement } from 'react';
import useWindowDimensions from 'src/hooks/useWindowDimensions';

//Types
import { Kaizen } from 'src/types/kaizen';

interface Props {
  kaizen: Kaizen,
  index: number,
  dimension: number
}


export const GalleryKaizen: FC<Props> = (props: Props) : ReactElement => {


    return (
      <div className={`relative rounded-md overflow-hidden cursor-pointer flex-initial`} style={{ maxWidth: '120px' }}>
        <img className={'w-full h-full'} src={`https://kai1.kaizencorps.com/g1/small/${props.kaizen.imageUrl}.jpg`}/>
        <div className="absolute bottom-1 left-1 bg-labelBlack rounded-sm p-1">
          <p className="text-white text-xs m-0 font-blenderprothin">{props.kaizen.name}</p>
        </div>
      </div>
    );
}

export default GalleryKaizen;
