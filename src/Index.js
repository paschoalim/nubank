import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation } from './Style';
import  Header  from './components/Header';
import  Tabs  from './components/Tabs';
import  Menu  from './components/Menu';
import { StatusBar } from 'react-native';
import { Animated } from 'react-native';
import { PanGestureHandler, State} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Index = () => {
   const translateY = new Animated.Value(0);
   let offset = 0;
   const animatedEvent = Animated.event(
       [
           {
                nativeEvent: {
                    translationY: translateY
                }
            }
       ],
       {useNativeDriver: true}
   );
   function onHandlerStateChanged(event){
        if (event.nativeEvent.oldState == State.ACTIVE){
            let opend = false;
            const { translationY } = event.nativeEvent;

            offset += translationY;

            if (translationY >= 100){
                opend = true;

            }else{
                translateY.setValue(offset);
                translateY.setOffset(0);
                offset = 0;
                opend = false; 
            }
            Animated.timing(translateY, {
                toValue: opend ? 420 : 0,
                duration: 200,
                useNativeDriver: true
            }).start(()=> {
                offset = opend ? 420 : 0;
                translateY.setOffset(offset);
                translateY.setValue(0);
            });

        }

   }
   const goToAbout = () => {
      Actions.about()
   }
   return (
     <>
      <StatusBar barStyle="light-content" backgroundColor="#8B10AE" />
     <Container >
    
        <Header />
        <Content>
            <Menu translateY={translateY} />

            <PanGestureHandler
                onGestureEvent={animatedEvent}
                onHandlerStateChange={onHandlerStateChanged}
            >
            <Card style={{
                transform: [{
                    translateY: translateY.interpolate({
                       inputRange: [-350, 0, 420],
                       outputRange: [-50, 0, 420],
                       extrapolate: 'clamp'
                    })
                }]
            }}>
                <CardHeader>
                    <Icon name="attach-money" size={28} color="#666" />
                    <Icon name="visibility-off" size={28} color="#666" />
                </CardHeader>
                <CardContent>
                    <Title>Saldo disponível</Title>
                    <Description>R$ 197.611,00</Description>
                </CardContent>
                <CardFooter>
                    <Annotation>
                        Transferência de R$ 20,10 recebida de João Pedro
                    </Annotation>
                </CardFooter>
            </Card>
            </PanGestureHandler>
        </Content>

        <Tabs translateY={translateY} />
     </Container>
    
    </>
   )
}
export default Index