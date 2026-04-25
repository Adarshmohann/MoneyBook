import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { AddRecordScreenProps } from '../../navigation/types';
import { updateRecord, bulkInsertRecords } from '../../database/db';
import { theme } from '../../utils/theme';
import AppLayout from '../../components/Layout';
import { styles } from './styles';
import { Camera, ImageIcon, ArrowLeft, Trash2, Plus, X, CheckCircle, AlertTriangle, Info } from '../../components/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface LedgerEntry {
  id: string;
  name: string;
  amount: string;
}

interface AlertConfig {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

const AddRecordScreen: React.FC<AddRecordScreenProps> = ({ navigation, route }) => {
  const editRecord = route.params?.record;

  const [entries, setEntries] = useState<LedgerEntry[]>([
    { id: Math.random().toString(), name: editRecord?.name || '', amount: editRecord?.amount.toString() || '' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // High-End Alert Modal State
  const [alert, setAlert] = useState<AlertConfig>({
    visible: false,
    title: '',
    message: '',
    type: 'success',
  });

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setAlert({ visible: true, title, message, type });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (editRecord) {
      navigation.setOptions({ title: 'Edit Record' });
    }
  }, [editRecord, navigation]);

  const addEntry = () => {
    setEntries([...entries, { id: Math.random().toString(), name: '', amount: '' }]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(e => e.id !== id));
    } else {
      setEntries([{ id: Math.random().toString(), name: '', amount: '' }]);
    }
  };

  const updateEntry = (id: string, field: keyof LedgerEntry, value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSave = async () => {
    const validEntries = entries.filter(e => e.name.trim() && e.amount.trim());
    if (validEntries.length === 0) {
      showAlert('Entry Error', 'Please provide a name and amount for at least one record.', 'warning');
      return;
    }

    try {
      if (editRecord && validEntries.length === 1) {
        const numAmount = parseInt(validEntries[0].amount.replace(/[^0-9]/g, ''), 10);
        updateRecord(editRecord.id, validEntries[0].name.trim(), numAmount);
      } else {
        const recordsToInsert = validEntries.map(e => ({
          name: e.name.trim(),
          amount: parseInt(e.amount.replace(/[^0-9]/g, ''), 10)
        }));
        await bulkInsertRecords(recordsToInsert);
      }
      navigation.goBack();
    } catch (error) {
      showAlert('Database Error', 'Could not save records to the ledger. Please try again.', 'error');
    }
  };

  const processImageLocally = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      const result = await TextRecognition.recognize(imageUri);
      const lines = result.text.split('\n');
      const newEntries: LedgerEntry[] = [];

      for (const line of lines) {
        let cleanLine = line
          .replace(/[—–-]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (!cleanLine || cleanLine.length < 3) continue;
        if (/january|tuesday|notes|wk|2024/i.test(cleanLine)) continue;

        const amountMatch = cleanLine.match(/(\d{2,6})\s*$/);
        if (!amountMatch) continue;

        const amountValue = amountMatch[1];
        let remaining = cleanLine.replace(amountValue, '').trim();
        remaining = remaining.replace(/^\d+\s*[.)-]?\s*/, '');

        const nameValue = remaining.replace(/[^a-zA-Z().\s]/g, '').trim();

        if (nameValue && parseInt(amountValue) > 0) {
          newEntries.push({
            id: Math.random().toString(),
            name: nameValue,
            amount: amountValue,
          });
        }
      }

      if (newEntries.length > 0) {
        setEntries(prev => {
          const filteredPrev = prev.filter(e => e.name || e.amount);
          return [...filteredPrev, ...newEntries];
        });
        showAlert('Scan Complete', `Successfully extracted ${newEntries.length} records from your page.`, 'success');
      } else {
        showAlert('No Data Detected', 'Try taking a clearer photo with better lighting or aligning the text vertically.', 'warning');
      }
    } catch (error) {
      showAlert('Processing Error', 'Failed to read the image text. Ensure the file format is supported.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraScan = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }
    const result = await launchCamera({ mediaType: 'photo', quality: 1.0 });
    if (result.assets?.[0]?.uri) await processImageLocally(result.assets[0].uri);
  };

  const handleGalleryScan = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1.0 });
    if (result.assets?.[0]?.uri) await processImageLocally(result.assets[0].uri);
  };

  return (
    <AppLayout scrollable={false} topColor={theme.colors.background} bottomColor={theme.colors.background} barStyle="light-content">
      <View style={styles.container}>
        {/* Custom Screen Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft color={theme.colors.textPrimary} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{editRecord ? 'Edit Entry' : 'Bulk Scan'}</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.scanSection}>
            <Text style={styles.sectionTitle}>Smart Capture</Text>
            <View style={styles.scanButtonsRow}>
              <TouchableOpacity style={styles.scanButton} onPress={handleCameraScan} disabled={isProcessing}>
                <View style={styles.iconCircle}><Camera color={theme.colors.textHighlight} size={26} /></View>
                <Text style={styles.scanButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scanButton} onPress={handleGalleryScan} disabled={isProcessing}>
                <View style={styles.iconCircle}><ImageIcon color={theme.colors.textHighlight} size={26} /></View>
                <Text style={styles.scanButtonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            {isProcessing && (
              <View style={styles.processingContainer}>
                <ActivityIndicator color={theme.colors.primary} size="small" />
                <Text style={styles.processingText}>Analyzing handwriting...</Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.formSection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text style={styles.sectionTitle}>Review Records</Text>
              <TouchableOpacity onPress={addEntry} style={styles.addButton}>
                <Plus color={theme.colors.primary} size={18} strokeWidth={3} />
                <Text style={styles.addButtonText}>Add Row</Text>
              </TouchableOpacity>
            </View>

            {entries.map((entry) => (
              <View key={entry.id} style={styles.entryRow}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={styles.entryLabel}>Name</Text>
                  <TextInput
                    style={styles.entryInput}
                    value={entry.name}
                    onChangeText={(val) => updateEntry(entry.id, 'name', val)}
                    autoCapitalize="words"
                    placeholder="Enter name"
                    placeholderTextColor={theme.colors.textSecondary + '66'}
                  />
                </View>
                <View style={{ width: 100, marginRight: 8 }}>
                  <Text style={styles.entryLabel}>Amount</Text>
                  <TextInput
                    style={styles.entryInput}
                    value={entry.amount}
                    onChangeText={(val) => updateEntry(entry.id, 'amount', val)}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={theme.colors.textSecondary + '66'}
                  />
                </View>
                <TouchableOpacity onPress={() => removeEntry(entry.id)} style={styles.removeButton}>
                  <Trash2 color={theme.colors.error} size={20} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>{editRecord ? 'Update' : `Save ${entries.length} Records`}</Text>
          </TouchableOpacity>
        </View>

        {/* --- CUSTOM HIGH-END ALERT MODAL --- */}
        <Modal
          visible={alert.visible}
          transparent
          animationType="fade"
          onRequestClose={hideAlert}
        >
          <View style={alertStyles.overlay}>
            <View style={alertStyles.container}>
              <View style={[alertStyles.iconContainer, { backgroundColor: alert.type === 'success' ? 'rgba(0, 208, 158, 0.1)' : alert.type === 'error' ? 'rgba(255, 76, 76, 0.1)' : 'rgba(255, 171, 0, 0.1)' }]}>
                {alert.type === 'success' && <CheckCircle color={theme.colors.primary} size={40} />}
                {alert.type === 'error' && <AlertTriangle color={theme.colors.error} size={40} />}
                {alert.type === 'warning' && <Info color="#FFAB00" size={40} />}
              </View>

              <Text style={alertStyles.title}>{alert.title}</Text>
              <Text style={alertStyles.message}>{alert.message}</Text>

              <TouchableOpacity
                style={[alertStyles.button, { backgroundColor: alert.type === 'success' ? theme.colors.primary : alert.type === 'error' ? theme.colors.error : '#FFAB00' }]}
                onPress={hideAlert}
                activeOpacity={0.8}
              >
                <Text style={alertStyles.buttonText}>CONTINUE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </AppLayout>
  );
};

const alertStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  container: {
    width: SCREEN_WIDTH - 60,
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0B0C10',
    letterSpacing: 1.5,
  },
});

export default AddRecordScreen;
