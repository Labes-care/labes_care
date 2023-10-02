import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const swipeContainerWidth = 135;
const swipeTransitionDistance = 30;

const TutorialScreen = ({ navigation }) => {
  const [swipeAnimation] = useState(new Animated.Value(0));
  const [swipeLoopAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(swipeLoopAnimation, {
          toValue: swipeTransitionDistance,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(swipeLoopAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
  }, [swipeLoopAnimation]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const containerWidth = Dimensions.get('window').width;
      const newX = Math.min(Math.max(0, gestureState.dx), containerWidth - swipeContainerWidth);
      swipeAnimation.setValue(newX);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 100) {
        const containerWidth = Dimensions.get('window').width;
        Animated.timing(swipeAnimation, {
          toValue: containerWidth,
          duration: 300,
          useNativeDriver: false,
        }).start(() => navigation.navigate('Start'));
      } else {
        Animated.spring(swipeAnimation, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    transform: [{ translateX: swipeAnimation }],
  };

  const swipeLoopStyle = {
    transform: [{ translateX: swipeLoopAnimation }],
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#001F3F', '#000000']} style={styles.gradient}>
        <BlurView style={styles.blur} intensity={90} tint="dark" />
        <View style={styles.circleContainer}>
          
          <Image source={require('./BG/blod.png')} style={styles.circleImage1} />
          <Image source={require('./BG/2.png')} style={styles.circleImage2} />
          <Image source={require('./BG/3.png')} style={styles.circleImage3} />
          <Image source={require('./BG/4.png')} style={styles.circleImage4} />
          <Image source={require('./BG/5.png')} style={styles.circleImage5} />
          <Image source={require('./BG/6.png')} style={styles.circleImage6} />
          <Image source={require('./BG/7.png')} style={styles.circleImage7} />


        </View>
        <View style={styles.textContainer}>
          
          <Text style={styles.headerText}>Your Health Our Priority</Text>
        </View>
        <Text style={styles.infoText}>Swipe to the right to continue</Text>

        <View style={styles.rectangleContainer}>
          <Animated.View
            style={[styles.swipeContainer, animatedStyle, swipeLoopStyle]}
            {...panResponder.panHandlers}
          >
            <View style={styles.arrowContainer}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
      <Image source={require('./doc.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circleImage1: {
    position: 'absolute',
    width: 100,
    height: 100,
    opacity: 0.3,
    top: 50,
    left: 50,
  },
  circleImage2: {
    position: 'absolute',
    width: 120,
    height: 120,
    opacity: 0.4,
    top: Dimensions.get('window').height - 170,
    left: Dimensions.get('window').width - 120,
  },
  circleImage3: {
    position: 'absolute',
    width: 80,
    height: 80,
    opacity: 0.5,
    top: 45,
    left: 280,
  },
  circleImage4: {
    position: 'absolute',
    width: 90,
    height: 90,
    opacity: 0.6,
    top: 200,
    left: Dimensions.get('window').width - 120,
  },
  circleImage5: {
    position: 'absolute',
    width: 90,
    height: 90,
    opacity: 0.6,
    top: 620,
    left: 15
  },
  circleImage6: {
    position: 'absolute',
    width: 90,
    height: 90,
    opacity: 0.6,
    top: 440,
    left: 290
  },
  circleImage7: {
    position: 'absolute',
    width: 90,
    height: 90,
    opacity: 0.6,
    top: 370,
    right: 310,
  },
  textContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height / 4 - 50,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 75,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: -133,
    bottom: 120,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    top: 700,
    zIndex: 1000,
    left: 65,
    marginBottom : 500
  },
  rectangleContainer: {
    position: 'absolute',
    bottom: Dimensions.get('window').height / 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.70)',
    marginBottom: -168,
    shadowColor: 'white',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  swipeContainer: {
    width: swipeContainerWidth,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    right: (Dimensions.get('window').width - swipeContainerWidth) / 2,
    backgroundColor: 'rgba(5, 29, 242, 0.80)',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 35,
    color: 'white',
    bottom: 3,
  },
  image: {
    width: 500,
    height: 530,
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
  },
});

export default TutorialScreen;
