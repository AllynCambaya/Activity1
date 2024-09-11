import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotificationScreen() {
  // Example notifications with tasks
  const [notifications, setNotifications] = useState([
    { id: '1', task: 'Meeting with the team', time: '10:00 AM' },
    { id: '2', task: 'Client call', time: '1:30 PM' },
    { id: '3', task: 'Prepare project report', time: '3:00 PM' },
  ]);

  // Function to delete a notification (optional)
  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    Alert.alert('Notification dismissed');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Notifications</ThemedText>

      {/* List of notifications */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <View>
              <ThemedText style={styles.taskText}>{item.task}</ThemedText>
              <ThemedText style={styles.timeText}>{item.time}</ThemedText>
            </View>
            <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
              <ThemedText style={styles.dismissText}>Dismiss</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',  // White background for minimalist look
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',  // Black text for title
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: '#000',  // Black task text
  },
  timeText: {
    fontSize: 14,
    color: '#555',  // Slightly grey color for time
  },
  dismissText: {
    color: '#ff0000',  // Red dismiss text for contrast
    fontSize: 14,
    fontWeight: '600',
  },
});
