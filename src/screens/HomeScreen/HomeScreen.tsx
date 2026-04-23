import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AppLayout from '../../components/Layout';
import { useFocusEffect } from '@react-navigation/native';
import { HomeScreenProps } from '../../navigation/types';
import { MoneyRecord } from '../../types';
import { getAllRecords, searchRecords, bulkInsertRecords } from '../../database/db';
import RecordCard from '../../components/RecordCard/RecordCard';
import { theme } from '../../utils/theme';
import { styles } from './styles';
import { Search, X, ReceiptText, Plus, Database } from '../../components/Icons';
import { seedData } from '../../data/seedData';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
          <Text style={styles.title}>Money Book</Text>
          <Text style={styles.subtitle}>Total: ₹{totalAmount.toLocaleString()}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color={theme.colors.textSecondary} size={20} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search entries..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 8 }}>
            <X color={theme.colors.textSecondary} size={20} />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <FlatList
        data={records}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecordCard
            record={item}
            onPress={() => navigation.navigate('RecordDetail', { record: item })}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ReceiptText color={theme.colors.textSecondary} size={64} opacity={0.6} />
            <Text style={styles.emptyText}>
              {searchQuery ? 'No records found.' : 'Your ledger is empty.\nAdd your first record!'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                onPress={async () => {
                  await bulkInsertRecords(seedData);
                  loadRecords();
                }}
                style={{
                  marginTop: 20,
                  backgroundColor: theme.colors.surface,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: theme.colors.primary + '33',
                }}
              >
                <Database color={theme.colors.primary} size={20} style={{ marginRight: 10 }} />
                <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>Insert Manually</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddRecord', { record: undefined })}
        activeOpacity={0.85}>
        <Plus color="#0B0C10" size={36} strokeWidth={2.5} />
      </TouchableOpacity>
    </AppLayout>
  );
};

export default HomeScreen;
