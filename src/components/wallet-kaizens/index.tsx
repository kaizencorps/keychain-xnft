import React, { FC, ReactElement } from 'react';

//Compponents
import GalleryKaizen from '../kaizen';
import { SubHeaderText, ThinText } from '../ui/text';

//SVGs
import ChevronRight from '../../assets/svgs/Icons/chevron-right';
import Star from '../../assets/svgs/Icons/star';
import Numeric1Box from '../../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../../assets/svgs/Icons/numeric-2-box';
import Numeric4Box from '../../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../../assets/svgs/Icons/numeric-5-box';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import {NFT} from "../../types/kaizen";


interface Props {
    items: NFT[],
    index: number,
    walletAddress: string,
}

const MAX_KAIZEN_WIDTH = 150;
const MAX_VIEWPORT_WIDTH = 1024;

const calcNumOfColumns = (screenWidth: number) => Math.floor(screenWidth / MAX_KAIZEN_WIDTH) // TODO incorpoarte horizontal margins


export const WalletKaizens : FC<Props> = (props: Props) : ReactElement => {

    const dims = useWindowDimensions();

    const [isExpanded, toggleExpanded] = React.useState(false);
    const [viewportWidth, setViewportWidth] = React.useState(dims.width >= MAX_VIEWPORT_WIDTH ? MAX_VIEWPORT_WIDTH : dims.width)
    const [numOfColumns, setNumOfColumns] = React.useState(calcNumOfColumns(viewportWidth))


    const formatAddress = React.useMemo(() => {
        const { walletAddress } = props;
        if(walletAddress === 'MY FAVORITES') return walletAddress;
        else return `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4, walletAddress.length)}`
    // eslint-disable-next-line
    }, [props.walletAddress])

    const getTextColor = React.useMemo(() => isExpanded ? "text-shinyGold" : "text-headerGray", [isExpanded])

    const getIcon = React.useCallback(() => {
        switch(props.index){
            case 0: return <Star color={isExpanded ? "#F8B600" : "#D5DDF9"} />
            case 1: return <Numeric1Box color={isExpanded ? "#F8B600" : "#D5DDF9"} />
            case 2: return <Numeric2Box color={isExpanded ? "#F8B600" : "#D5DDF9"} />
            case 3: return <Numeric2Box color={isExpanded ? "#F8B600" : "#D5DDF9"} />
            case 4: return <Numeric4Box color={isExpanded ? "#F8B600" : "#D5DDF9"} />
            case 5: return <Numeric5Box color={isExpanded ? "#F8B600" : "#D5DDF9"} />
        }
    }, [isExpanded])

    return (
        <div className="mb-1">
          <div
            className={`flex flex-row justify-between cursor-pointer rounded-md p-2 ${!isExpanded && 'bg-headerBackgroundGray'}`}
            onClick={() => toggleExpanded(!isExpanded)}
          >
            <div className='flex flex-row'>
                {getIcon()}
                <SubHeaderText className={`${getTextColor} ml-2`}>{formatAddress}</SubHeaderText>
            </div>
            <div className='flex flex-row'>
                <ThinText className={`${getTextColor} font-blenderpromedium`}>
                    {props.items.length.toString()}
                </ThinText>
                <ChevronRight color={isExpanded ? "#F8B600" : "#D5DDF9"} rotation={90} />
            </div>
          </div>
          <div className="flex flex-wrap content-start justify-start w-full gap-2">
            { isExpanded && props.items.map((kaizen, i: number) => <GalleryKaizen key={i} index={i} kaizen={kaizen} dimension={Math.round(viewportWidth / numOfColumns)}/>) }
          </div>
        </div>
    );
}

export default WalletKaizens;
