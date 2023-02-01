import React, { FC, ReactElement } from 'react';

//Compponents
import GalleryNFT from 'components/galleryNFT/galleryNFT';
import { SubHeaderText, ThinText } from 'components/ui/text/text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';  

//SVGs
import ChevronRight from 'assets/svgs/Icons/chevron';
import Star from 'assets/svgs/Icons/star';
import Numeric1Box from 'assets/svgs/Icons/numeric-1-box';
import Numeric2Box from 'assets/svgs/Icons/numeric-2-box';
import Numeric3Box from 'assets/svgs/Icons/numeric-3-box';
import Numeric4Box from 'assets/svgs/Icons/numeric-4-box';
import Numeric5Box from 'assets/svgs/Icons/numeric-5-box';
import useWindowDimensions from 'hooks/useWindowDimensions';
import {NFT} from "types/NFT";

//Utils
import { formatAddress } from 'utils/stringFormatting';

//Styles
import * as Theme from 'constants/theme';

interface Props {
    items: NFT[],
    index: number,
    walletAddress: string,
    goToFocusNFT: (nft: NFT, walletAddress: string) => void
}

const MAX_NFT_WIDTH = 150;
const MAX_VIEWPORT_WIDTH = 1024;

const calcNumOfColumns = (screenWidth: number) => Math.floor(screenWidth / MAX_NFT_WIDTH) // TODO incorpoarte horizontal margins


export const WalletNFTs : FC<Props> = (props: Props) : ReactElement => {

    const dims = useWindowDimensions();

    const [isExpanded, toggleExpanded] = React.useState(false);
    const [viewportWidth, setViewportWidth] = React.useState(dims.width >= MAX_VIEWPORT_WIDTH ? MAX_VIEWPORT_WIDTH : dims.width)
    const [numOfColumns, setNumOfColumns] = React.useState(calcNumOfColumns(viewportWidth)) // TODO utilize this properly

    const formatWalletAddress = React.useMemo(() => {
        const { walletAddress } = props;
        if(walletAddress === 'MY FAVORITES') return walletAddress;
        else return formatAddress(walletAddress);
    // eslint-disable-next-line
    }, [props.walletAddress])

    const getTextColor = React.useMemo(() => isExpanded ? Theme.COLORS.FAV_GOLD : Theme.COLORS.HEADER_GRAY, [isExpanded])

    const getIcon = React.useCallback(() => {
        switch(props.index){
            case 0: return <Star color={isExpanded ? Theme.COLORS.FAV_GOLD : "#D5DDF9"} />
            case 1: return <Numeric1Box color={isExpanded ? Theme.COLORS.FAV_GOLD : "#D5DDF9"} />
            case 2: return <Numeric2Box color={isExpanded ? Theme.COLORS.FAV_GOLD : "#D5DDF9"} />
            case 3: return <Numeric3Box color={isExpanded ? Theme.COLORS.FAV_GOLD : "#D5DDF9"} />
            case 4: return <Numeric4Box color={isExpanded ? Theme.COLORS.FAV_GOLD : "#D5DDF9"} />
            case 5: return <Numeric5Box color={isExpanded ? Theme.COLORS.FAV_GOLD : "#D5DDF9"} />
        }
    }, [isExpanded])


    return (
        <View style={styles.con}>
            <TouchableOpacity
                style={[!isExpanded && { backgroundColor: Theme.COLORS.HEADER_BACKGROUND_GRAY}, styles.main]}
                onPress={() => toggleExpanded(!isExpanded)}
            >
                <View style={styles.row}>
                    {getIcon()}
                    <SubHeaderText style={{ marginLeft: Theme.SPACING.SM, color: getTextColor }}>{formatWalletAddress}</SubHeaderText>
                </View>
                <View style={styles.row}>
                    <ThinText style={{ color: getTextColor }}>
                        {props.items.length.toString()}
                    </ThinText>
                    <ChevronRight color={isExpanded ? Theme.COLORS.FAV_GOLD : "#D5DDF9"} rotation={90} />
                </View>
            </TouchableOpacity>
            <View style={styles.nftsCon}>
                {isExpanded && props.items.map((nft, i: number) => 
                    <GalleryNFT 
                        key={i} 
                        index={i} 
                        nft={nft} 
                        dimension={Math.round(viewportWidth / numOfColumns)}
                        func={(nft: NFT) => props.goToFocusNFT(nft, props.walletAddress)}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    con: {
        paddingTop: Theme.SPACING.XXL,
    },
    main: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: Theme.BRADIUS.MD,
        padding: Theme.SPACING.SM
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nftsCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        gap: Theme.SPACING.SM // TODO only works on Web. Needs RN solution
    }
})

export default WalletNFTs;
