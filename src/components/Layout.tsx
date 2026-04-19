import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface AppLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  topColor?: string;
  bottomColor?: string;
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  bottom? : boolean,
  behaviour?  : any
  barStyle? : any
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  barStyle,
  scrollable = false,
  topColor = "white",
  bottomColor = "white",
  gradientColors,
  bottom  = true ,
  behaviour 
}) => {
  const insets = useSafeAreaInsets();

const headerHeight :any = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const [keyboardOffset, setKeyboardOffset] = useState(-30); // default offset
const [keyboardup, setKeyboardup] = useState(false);

useEffect(() => {
  const showSub = Keyboard.addListener('keyboardDidShow', (e: any) => {
    setKeyboardup(true);
  });

  const hideSub = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardup(false);
  });

  return () => {
    showSub.remove();
    hideSub.remove();
  };
}, []);

  return (
    <View style={{ flex: 1, backgroundColor: topColor }}>
      <StatusBar
        translucent={false}
        backgroundColor={topColor}
        barStyle={barStyle??"dark-content"}  
      />

      <KeyboardAvoidingView style={{ flex: 1 }} 
      behavior="padding" 
      // keyboardVerticalOffset={keyboardup?-50:0} 
      enabled={keyboardup} 
      >
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
        >
          
            {scrollable ? (
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
                keyboardShouldPersistTaps="handled"
                bounces={false}
                overScrollMode="never"
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                
              >
                {children}
              </ScrollView>
            ) : (
              <View style={{ flex: 1 }}>{children}</View>
            )}

        </View>
      </KeyboardAvoidingView>

      {bottom && <View style={{ height: insets.bottom, backgroundColor: bottomColor }} />}


    </View>
  );
};

export default AppLayout;
