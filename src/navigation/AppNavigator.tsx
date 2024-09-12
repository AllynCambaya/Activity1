import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import TodoList from '@/app/(tabs)/index';
import SearchTab from '@/app/(tabs)/search';
import { Colors } from '@/constants/Colors'; // Assuming you have a color scheme constants file

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // Initialize iconName with a default value to avoid the "used before assigned" error
            let iconName: string = 'ios-list-outline';

            if (route.name === 'TodoList') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            }

            // Cast the icon name to string since Ionicons accepts any valid string
            return <Ionicons name={iconName as string} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.light.tint, // Use color scheme from your constants file
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#E5DFB6' }, // Set background color for tab bar
        })}
      >
        {/* Define your screens here */}
        <Tab.Screen 
          name="TodoList" 
          component={TodoList} 
          options={{ title: 'Home' }}  // You can customize screen options like title here
        />
        <Tab.Screen 
          name="Search" 
          component={SearchTab} 
          options={{ title: 'Search' }}  // Customize screen title for Search tab
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
