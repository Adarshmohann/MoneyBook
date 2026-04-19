import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {initDB} from './src/database/db';

const App = () => {
  useEffect(() => {
    // Initialize standard SQLite database schema on app startup
    try {
      initDB();
      console.log('Database initialized successfully');
    } catch (e) {
      console.error('Failed to initialize database', e);
    }
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
