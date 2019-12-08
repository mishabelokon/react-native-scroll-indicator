import React, { useState, useEffect } from 'react';

import { ScrollView, View, StyleSheet, Animated } from 'react-native';

export default ({
    children,
    indicatorHeight = 200,
    flexibleIndicator = true,
    shouldIndicatorHide = true,
    hideTimeout = 500,
    style = {},
    scrollViewStyle = {},
    scrollIndicatorContainerStyle = {},
    scrollIndicatorStyle = {},
    ...props
}) => {
    const [fadeAnim] = useState(
        new Animated.Value(shouldIndicatorHide ? 0 : 1),
    );
    const [fromTop, setFromTop] = useState(0);
    const [indicatorFlexibleHeight, setIndicatorFlexibleHeight] = useState(
        indicatorHeight,
    );
    const [visibleScrollPartHeight, setVisibleScrollPartHeight] = useState(1);
    const [fullSizeContentHeight, setFullSizeContentHeight] = useState(1);
    const [isIndicatorHidden, setIsIndicatorHidden] = useState(
        shouldIndicatorHide,
    );

    const [
        scrollIndicatorContainerHeight,
        setScrollIndicatorContainerHeight,
    ] = useState(1);

    const handleScroll = ({ contentOffset }) => {
        //Calculation scroll indicator position based on child height and scrollView view height)
        const movePercent =
            contentOffset.y /
            ((fullSizeContentHeight - visibleScrollPartHeight) / 100);
        const position =
            ((visibleScrollPartHeight -
                indicatorFlexibleHeight -
                (visibleScrollPartHeight - scrollIndicatorContainerHeight)) /
                100) *
            movePercent;
        setFromTop(position);
    };

    useEffect(() => {
        //Hide / show Animation effect
        if (shouldIndicatorHide) {
            isIndicatorHidden
                ? Animated.timing(fadeAnim, {
                      toValue: 0,
                      duration: hideTimeout,
                  }).start()
                : Animated.timing(fadeAnim, {
                      toValue: 1,
                      duration: hideTimeout,
                  }).start();
        }
    }, [fadeAnim, hideTimeout, isIndicatorHidden, shouldIndicatorHide]);

    useEffect(() => {
        //Change indicator height effect
        flexibleIndicator &&
            setIndicatorFlexibleHeight(
                visibleScrollPartHeight *
                    (visibleScrollPartHeight / fullSizeContentHeight),
            );
    }, [visibleScrollPartHeight, fullSizeContentHeight, flexibleIndicator]);

    const runHideTimer = () => {
        shouldIndicatorHide && setIsIndicatorHidden(true);
    };

    const showIndicator = () => {
        shouldIndicatorHide && setIsIndicatorHidden(false);
    };

    const isContentSmallerThanScrollView =
        fullSizeContentHeight - visibleScrollPartHeight <= 0;

    return (
        <View style={[styles.container, style]}>
            <ScrollView
                style={[styles.scrollViewContainer, scrollViewStyle]}
                onContentSizeChange={(width, height) => {
                    setFullSizeContentHeight(height);
                }}
                onLayout={e =>
                    setVisibleScrollPartHeight(e.nativeEvent.layout.height)
                }
                onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
                scrollEventThrottle={16}
                onMomentumScrollEnd={() => runHideTimer()}
                onScrollBeginDrag={() => showIndicator()}
                showsVerticalScrollIndicator={false}
                {...props}
            >
                {children}
            </ScrollView>
            {!isContentSmallerThanScrollView && (
                <Animated.View
                    style={[
                        styles.scrollIndicatorContainer,
                        { opacity: fadeAnim },
                        scrollIndicatorContainerStyle,
                    ]}
                    onLayout={e =>
                        setScrollIndicatorContainerHeight(
                            e.nativeEvent.layout.height,
                        )
                    }
                >
                    <View
                        style={[
                            styles.scrollIndicator,
                            { top: fromTop, height: indicatorFlexibleHeight },
                            scrollIndicatorStyle,
                        ]}
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    scrollViewContainer: {
        flex: 1,
    },
    scrollIndicatorContainer: {
        position: 'absolute',
        top: 0,
        right: 2,
        bottom: 0,
        overflow: 'hidden',
        borderRadius: 10,
        width: 6,
        marginVertical: 3,
    },
    scrollIndicator: {
        position: 'absolute',
        right: 0,
        width: 6,
        borderRadius: 3,
        opacity: 0.5,
        backgroundColor: 'blue',
    },
});
