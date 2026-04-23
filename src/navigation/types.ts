import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MoneyRecord} from '../types';

export type RootStackParamList = {
  Home: undefined;
  AddRecord: {record?: MoneyRecord};
  RecordDetail: {record: MoneyRecord};
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type AddRecordScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRecord'>;
export type RecordDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'RecordDetail'>;
