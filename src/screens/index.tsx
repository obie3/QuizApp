// In App.js in a new project
import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Subject = { id: string; title: string };

const SUBJECTS: Subject[] = [
  { id: 'science', title: 'Science' },
  { id: 'history', title: 'History' },
  { id: 'sports', title: 'Sports' },
];

function SubjectCard({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.iconPlaceholder} />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function index({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Subject</Text>
      <FlatList
        data={SUBJECTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <SubjectCard
            title={item.title}
            onPress={() => navigation.navigate('Quiz', { subject: item })}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f8',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#e6eef8',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 12,
  },
});
