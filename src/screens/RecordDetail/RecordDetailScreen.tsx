import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { RecordDetailScreenProps } from '../../navigation/types';
import AppLayout from '../../components/Layout';
import { theme } from '../../utils/theme';
import { styles } from './styles';
import { Edit2, Trash2, X } from '../../components/Icons';
import { deleteRecord, getRecordById } from '../../database/db';
import { useFocusEffect } from '@react-navigation/native';
import { MoneyRecord } from '../../types';

const RecordDetailScreen: React.FC<RecordDetailScreenProps> = ({ route, navigation }) => {
  const [record, setRecord] = useState<MoneyRecord | null>(route.params.record);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const updatedRecord = getRecordById(route.params.record.id);
      if (updatedRecord) {
        setRecord(updatedRecord);
      } else {
        navigation.goBack();
      }
    }, [route.params.record.id, navigation])
  );

  if (!record) return null;

  const date = new Date(record.created_at).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const confirmDelete = () => {
    deleteRecord(record.id);
    setDeleteModalVisible(false);
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('AddRecord', { record });
  };

  return (
    <AppLayout topColor={theme.colors.background} bottomColor={theme.colors.background} barStyle="light-content">
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Recipient Name</Text>
          <Text style={styles.name}>{record.name}</Text>

          <Text style={styles.label}>Amount Given</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>₹{record.amount.toLocaleString()}</Text>
          </View>

          <Text style={styles.label}>Transaction Date</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]} 
            onPress={handleEdit}
          >
            <Edit2 color={theme.colors.textPrimary} size={20} />
            <Text style={[styles.buttonText, styles.editText]}>Edit Record</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]} 
            onPress={() => setDeleteModalVisible(true)}
          >
            <Trash2 color="#FF5252" size={20} />
            <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <View style={localStyles.modalHeader}>
              <View style={localStyles.warningIconContainer}>
                <Trash2 color="#FF5252" size={32} />
              </View>
              <TouchableOpacity 
                style={localStyles.closeButton} 
                onPress={() => setDeleteModalVisible(false)}
              >
                <X color={theme.colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
            
            <Text style={localStyles.modalTitle}>Delete Record?</Text>
            <Text style={localStyles.modalDescription}>
              Are you sure you want to delete the record for "{record.name}"? This action cannot be undone.
            </Text>

            <View style={localStyles.modalFooter}>
              <TouchableOpacity 
                style={[localStyles.modalButton, localStyles.cancelButton]} 
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={localStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[localStyles.modalButton, localStyles.confirmButton]} 
                onPress={confirmDelete}
              >
                <Text style={localStyles.confirmButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
};

const localStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  warningIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 82, 82, 0.2)',
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  confirmButton: {
    backgroundColor: '#FF5252',
  },
  cancelButtonText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RecordDetailScreen;
