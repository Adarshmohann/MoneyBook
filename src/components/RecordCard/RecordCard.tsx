import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {MoneyRecord} from '../../types';
import {styles} from './styles';

interface RecordCardProps {
  record: MoneyRecord;
  onPress: () => void;
}

const RecordCard: React.FC<RecordCardProps> = ({record, onPress}) => {
  const date = new Date(record.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.cardContainer}>
      <View style={styles.content}>
        <Text style={styles.name}>{record.name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₹{record.amount.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecordCard;
