import React, { FC, ReactElement } from 'react';

//Types
import { NFT } from '../../types/kaizen';

interface Props {
  kaizen: NFT,
  index: number,
  dimension: number
}


export const GalleryKaizen: FC<Props> = (props: Props) : ReactElement => {


    return (
      <div className={`relative rounded-md overflow-hidden cursor-pointer flex-initial`} style={{ maxWidth: '120px' }}>
        <img className={'w-full h-full'} src={`${props.kaizen.imageUrl}`}/>
        <div className="absolute bottom-1 left-1 bg-labelBlack rounded-sm p-1">
          <p className="text-white text-xs m-0 font-blenderprothin">{props.kaizen.name}</p>
        </div>
      </div>
    );
}

export default GalleryKaizen;
