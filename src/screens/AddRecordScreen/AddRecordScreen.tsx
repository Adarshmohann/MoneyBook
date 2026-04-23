import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { AddRecordScreenProps } from '../../navigation/types';
import { insertRecord, updateRecord } from '../../database/db';
import { theme } from '../../utils/theme';
import AppLayout from '../../components/Layout';
import { styles } from './styles';
import { Camera, ImageIcon, ArrowLeft } from '../../components/Icons';

const AddRecordScreen: React.FC<AddRecordScreenProps> = ({ navigation, route }) => {
  const editRecord = route.params?.record;
  
  const [name, setName] = useState(editRecord?.name || '');
  const [amount, setAmount] = useState(editRecord?.amount.toString() || '');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name.');
      return;
    }
    const numAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid amount.');
      return;
    }

    if (editRecord) {
      updateRecord(editRecord.id, name.trim(), numAmount);
    } else {
      insertRecord(name.trim(), numAmount);
    }
    navigation.goBack();
  };

  const processImageText = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      const result = await TextRecognition.recognize(imageUri);
      let foundName = '';
      let foundAmount = '';
      const lines = result.text.split('\n');
      for (const line of lines) {
        const cleanLine = line.trim();
        const amountMatch = cleanLine.match(/(?:rs\.?|₹|inr)?\s*(\d+(?:,\d+)*)\s*(?:\/-)?/i);
        if (amountMatch && !foundAmount) {
          foundAmount = amountMatch[1].replace(/,/g, '');
        } else if (!foundName && cleanLine.length > 2 && /^[A-Z][a-zA-Z\s]+$/.test(cleanLine)) {
          foundName = cleanLine;
        }
      }
      if (foundName) setName(foundName);
      if (foundAmount) setAmount(foundAmount);
      if (!foundName && !foundAmount) {
        Alert.alert('Analysis Complete', 'Could not detect details. Please enter manually.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process image text.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraScan = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }
    const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
    if (result.assets?.[0]?.uri) await processImageText(result.assets[0].uri);
  };

  const handleGalleryScan = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (result.assets?.[0]?.uri) await processImageText(result.assets[0].uri);
  };

  return (
    <AppLayout scrollable={false} topColor={theme.colors.background} bottomColor={theme.colors.background} barStyle="light-content">
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={theme.colors.textPrimary} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editRecord ? 'Edit Record' : 'Add New Record'}
          </Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {/* Content */}
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scanSection}>
            <Text style={styles.sectionTitle}>Smart Scan (OCR)</Text>
            <View style={styles.scanButtonsRow}>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleCameraScan}
                disabled={isProcessing}
              >
                <View style={styles.iconCircle}>
                  <Camera color={theme.colors.textHighlight} size={28} strokeWidth={2.2} />
                </View>
                <Text style={styles.scanButtonText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleGalleryScan}
                disabled={isProcessing}
              >
                <View style={styles.iconCircle}>
                  <ImageIcon color={theme.colors.textHighlight} size={28} strokeWidth={2.2} />
                </View>
                <Text style={styles.scanButtonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            {isProcessing && <Text style={styles.processingText}>Processing your receipt...</Text>}
          </View>

          <View style={styles.divider} />

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Manual Entry</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Recipient Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                placeholderTextColor={theme.colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount Given (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor={theme.colors.textSecondary}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* Fixed Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave} 
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>
              {editRecord ? 'Update Record' : 'Save Record'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
};

export default AddRecordScreen;
