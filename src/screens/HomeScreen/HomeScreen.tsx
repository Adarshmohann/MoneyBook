import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AppLayout from '../../components/Layout';
import {useFocusEffect} from '@react-navigation/native';
import {HomeScreenProps} from '../../navigation/types';
import {MoneyRecord} from '../../types';
import {getAllRecords, searchRecords} from '../../database/db';
import RecordCard from '../../components/RecordCard/RecordCard';
import {theme} from '../../utils/theme';
import {styles} from './styles';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [records, setRecords] = useState<MoneyRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadRecords = useCallback(() => {
    if (searchQuery.trim().length > 0) {
      setRecords(searchRecords(searchQuery));
    } else {
      setRecords(getAllRecords());
    }
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [loadRecords]),
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      loadRecords();
    }, 300); // 300ms debounce
    return () => clearTimeout(handler);
  }, [searchQuery, loadRecords]);

  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  return (
    <AppLayout topColor={theme.colors.background} bottomColor={theme.colors.background} barStyle="light-content">
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Kaineettam Ledger</Text>
          <Text style={styles.subtitle}>Total: ₹{totalAmount.toLocaleString()}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search entries..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✖</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <RecordCard record={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No records found.' : 'Your ledger is empty.\nAdd your first record!'}
            </Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddRecord')}
        activeOpacity={0.85}>
        <Text style={styles.fabText}>➕</Text>
      </TouchableOpacity>
    </AppLayout>
  );
};

export default HomeScreen;
