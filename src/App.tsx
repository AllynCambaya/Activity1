import React from 'react';
import { TaskProvider } from './context/TaskContext';  // Import TaskProvider
import { AppNavigator } from './navigation/AppNavigator';  // Assuming you have a navigator set up

export default function App() {
  return (
    <TaskProvider>  {/* Wrap your app with TaskProvider */}
      <AppNavigator />  {/* Replace this with your actual navigation structure */}
    </TaskProvider>
  );
}
