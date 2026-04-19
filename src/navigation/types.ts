import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddRecord: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AddRecordScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRecord'>;
