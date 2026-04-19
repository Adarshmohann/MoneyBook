import React from 'react';
import {View, Text} from 'react-native';
import {MoneyRecord} from '../../types';
import {styles} from './styles';

interface RecordCardProps {
  record: MoneyRecord;
}

const RecordCard: React.FC<RecordCardProps> = ({record}) => {
  const date = new Date(record.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <Text style={styles.name}>{record.name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₹{record.amount.toLocaleString()}</Text>
      </View>
    </View>
  );
};

export default RecordCard;
