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
  bottom  = true ,
  behaviour 
}) => {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow', 
      () => setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide', 
      () => setKeyboardVisible(false)
    );

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
        barStyle={barStyle ?? "dark-content"}  
      />

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={behaviour ?? (Platform.OS === 'ios' ? 'padding' : 'height')}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
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

      {/* Hide bottom inset when keyboard is up to allow footer to sit flush on keyboard */}
      {bottom && !keyboardVisible && (
        <View style={{ height: insets.bottom, backgroundColor: bottomColor }} />
      )}
    </View>
  );
};

export default AppLayout;
