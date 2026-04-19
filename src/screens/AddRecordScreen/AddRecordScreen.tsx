import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { AddRecordScreenProps } from '../../navigation/types';
import { insertRecord } from '../../database/db';
import { theme } from '../../utils/theme';
import AppLayout from '../../components/Layout';
import { styles } from './styles';

const AddRecordScreen: React.FC<AddRecordScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
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

    insertRecord(name.trim(), numAmount);
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
        Alert.alert('Analysis Complete', 'Could not automatically detect a name or amount. Please enter manually.', [{ text: 'OK' }]);
      } else {
        Alert.alert('Extracted text', 'Please review the extracted name and amount.', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('OCR Error:', error);
      Alert.alert('Error', 'Failed to process image text.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraScan = async () => {


    const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
    console.log("result", result);
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        await processImageText(uri);
      }
    }
  };

  const handleGalleryScan = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        await processImageText(uri);
      }
    }
  };

  return (
    <AppLayout scrollable={false} topColor={theme.colors.background} bottomColor={theme.colors.background} barStyle="light-content">
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>

        <View style={styles.scanSection}>
          <Text style={styles.sectionTitle}>Smart Scan (OCR)</Text>
          <View style={styles.scanButtonsRow}>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleCameraScan}
              disabled={isProcessing}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>📷</Text>
              </View>
              <Text style={styles.scanButtonText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleGalleryScan}
              disabled={isProcessing}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>🖼️</Text>
              </View>
              <Text style={styles.scanButtonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          {isProcessing && <Text style={styles.processingText}>Processing image...</Text>}
        </View>

        <View style={styles.divider} />

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Manual Entry</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
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

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Record</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
};

export default AddRecordScreen;
