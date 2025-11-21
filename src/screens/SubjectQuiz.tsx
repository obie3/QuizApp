import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QUESTIONS: Record<string, Array<any>> = {
  science: [
    {
      id: 's1',
      question: 'What is the chemical symbol for water?',
      choices: ['H2O', 'O2', 'CO2', 'HO'],
      answerIndex: 0,
    },
    {
      id: 's2',
      question: 'Which planet is known as the Red Planet?',
      choices: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answerIndex: 1,
    },
  ],
  history: [
    {
      id: 'h1',
      question: 'Who was the first President of the United States?',
      choices: [
        'Abraham Lincoln',
        'George Washington',
        'Thomas Jefferson',
        'John Adams',
      ],
      answerIndex: 1,
    },
    {
      id: 'h2',
      question: 'In which year did World War II end?',
      choices: ['1945', '1939', '1918', '1963'],
      answerIndex: 0,
    },
  ],
  sports: [
    {
      id: 'sp1',
      question: 'How many players are on a soccer team on the field?',
      choices: ['9', '10', '11', '12'],
      answerIndex: 2,
    },
    {
      id: 'sp2',
      question: 'In basketball, how many points is a free throw worth?',
      choices: ['1', '2', '3', '0'],
      answerIndex: 0,
    },
  ],
};

export default function SubjectQuiz({ route, navigation }: any) {
  const { subject } = route.params || {
    subject: { id: 'science', title: 'Science' },
  };
  const list = QUESTIONS[subject.id] || [];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [remaining, setRemaining] = useState(30);
  const timerRef = useRef<number | null>(null);
  const advancingRef = useRef(false);
  const onNextRef = useRef<any>(null);
  // keep a stable ref to the latest onNext implementation
  useEffect(() => {
    onNextRef.current = onNext;
  });

  function onSelectChoice(choiceIndex: number) {
    setSelected(choiceIndex);
  }

  function onNext() {
    // prevent double-advancing
    if (advancingRef.current) return;
    advancingRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current as any);
      timerRef.current = null;
    }
    const q = list[index];
    if (selected === q.answerIndex) setScore(s => s + 1);
    setSelected(null);
    if (index + 1 >= list.length) {
      setShowResults(true);
    } else {
      setIndex(i => i + 1);
    }
    // allow future advances after short delay
    setTimeout(() => {
      advancingRef.current = false;
    }, 500);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowResults(false);
  }

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current as any);
      timerRef.current = null;
    }

    if (showResults || list.length === 0) return;

    setRemaining(30);
    timerRef.current = setInterval(() => {
      setRemaining(r => r - 1);
    }, 1000) as unknown as number;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current as any);
        timerRef.current = null;
      }
    };
  }, [index, showResults, list.length]);

  // if remaining reaches 0, auto-advance
  useEffect(() => {
    if (remaining <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current as any);
        timerRef.current = null;
      }
      if (!advancingRef.current) {
        advancingRef.current = true;
        // call latest onNext from ref to avoid effect dependency
        onNextRef.current && onNextRef.current();
      }
    }
  }, [remaining]);

  if (list.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{subject.title} Quiz</Text>
        <Text style={styles.message}>
          No questions available for this subject.
        </Text>
      </View>
    );
  }

  if (showResults) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{subject.title} - Results</Text>
        <View style={styles.center}>
          <Text style={styles.score}>
            You scored {score} / {list.length}
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={restart}>
            <Text style={styles.primaryButtonText}>Retake Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ghostButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.ghostButtonText}>Back to Subjects</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const current = list[index];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{subject.title} Quiz</Text>
      <View style={styles.card}>
        <View style={styles.timerRow}>
          <Text style={[styles.timer, remaining <= 10 && styles.timerLow]}>
            Time: {remaining}s
          </Text>
        </View>
        <Text style={styles.question}>{current.question}</Text>
        {current.choices.map((c: string, i: number) => {
          const isSelected = selected === i;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.choice, isSelected && styles.choiceSelected]}
              onPress={() => onSelectChoice(i)}
              activeOpacity={0.8}
            >
              <Text style={styles.choiceText}>{c}</Text>
            </TouchableOpacity>
          );
        })}

        <View style={styles.separator} />
        <TouchableOpacity
          style={[
            styles.primaryButton,
            !Number.isInteger(selected) && styles.primaryButtonDisabled,
          ]}
          onPress={onNext}
          disabled={!Number.isInteger(selected)}
        >
          <Text style={styles.primaryButtonText}>
            {index + 1 >= list.length ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fb' },
  header: { fontSize: 22, fontWeight: '600', padding: 16 },
  center: { alignItems: 'center', marginTop: 40 },
  score: { fontSize: 18, marginBottom: 20 },
  message: { padding: 16, fontSize: 16 },
  card: { margin: 16, backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  question: { fontSize: 18, marginBottom: 12 },
  choice: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    marginBottom: 8,
  },
  choiceSelected: { backgroundColor: '#d6e9ff' },
  choiceText: { fontSize: 16 },
  primaryButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '600' },
  primaryButtonDisabled: { opacity: 0.5 },
  ghostButton: { marginTop: 12 },
  ghostButtonText: { color: '#2563eb' },
  separator: { height: 12 },
  timerRow: { marginBottom: 12 },
  timer: { fontSize: 16, fontWeight: '600', color: '#2563eb' },
  timerLow: { color: '#dc2626' },
});
