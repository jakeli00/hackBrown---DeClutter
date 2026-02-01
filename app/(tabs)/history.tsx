import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

// Mock data for history - in a real app, this would come from storage/state management
const mockHistory = [
  {
    id: '1',
    date: '2024-01-15',
    time: '10:30 AM',
    imageUri: null,
    itemsDecluttered: 5,
    location: 'Living Room',
  },
  {
    id: '2',
    date: '2024-01-14',
    time: '3:45 PM',
    imageUri: null,
    itemsDecluttered: 3,
    location: 'Bedroom',
  },
  {
    id: '3',
    date: '2024-01-13',
    time: '11:20 AM',
    imageUri: null,
    itemsDecluttered: 8,
    location: 'Kitchen',
  },
];

export default function HistoryScreen() {
  const [historyItems] = useState(mockHistory);

  const renderHistoryItem = ({ item }: { item: typeof mockHistory[0] }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.cardContent}>
        {item.imageUri ? (
          <ExpoImage
            source={{ uri: item.imageUri }}
            style={styles.historyImage}
            contentFit="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <View style={styles.cardInfo}>
          <Text style={styles.locationText}>📍 {item.location}</Text>
          <Text style={styles.itemsText}>
            {item.itemsDecluttered} item{item.itemsDecluttered !== 1 ? 's' : ''} decluttered
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Your decluttering journey</Text>
      </View>
      {historyItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No history yet</Text>
          <Text style={styles.emptySubtext}>Start taking photos to build your history!</Text>
        </View>
      ) : (
        <FlatList
          data={historyItems}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D2691E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  listContent: {
    padding: 16,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
  },
  cardContent: {
    gap: 12,
  },
  historyImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#999999',
  },
  cardInfo: {
    gap: 6,
  },
  locationText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  itemsText: {
    fontSize: 14,
    color: '#D2691E',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
