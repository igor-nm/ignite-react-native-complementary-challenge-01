import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';

import penIcon from '../assets/icons/pen/pen.png';
import trashIcon from '../assets/icons/trash/trash.png';

export interface Task {
  id: number;
  done: boolean;
  title: string;
}

interface TasksItemProps {
  task: Task;
  index: number;
  editTask: (id: number, taskNewTitle: string, resetPreviousTaskValue: Function) => void;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
}

export function TaskItem({ task, index, editTask, removeTask, toggleTaskDone }: TasksItemProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [taskNewTitle, setTaskNewTitle] = useState<string>(task.title);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [isEditing]);

  function handleStartingEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setEditing(false);
    setTaskNewTitle(task.title);
  }

  function handleSubmitEditing() {
    setEditing(false);
    editTask(task.id, taskNewTitle, () => setTaskNewTitle(task.title));
  }

  return (
    <View style={styles.container}>
      <View style={styles.task} >
        <TouchableOpacity
          activeOpacity={0.7}
          testID={`button-${index}`}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                size={12}
                name="check"
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            ref={textInputRef}
            value={taskNewTitle}
            editable={isEditing}
            returnKeyType={'send'}
            onChangeText={setTaskNewTitle}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.groupButton}>
        { !isEditing ? (
            <TouchableOpacity
              testID={`edit-${index}`}
              onPress={handleStartingEditing}
              style={{ paddingHorizontal: 24 }}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID={`cancel-${index}`}
              onPress={handleCancelEditing}
              style={{ paddingHorizontal: 24 }}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          )
        }
        <View style={styles.divider} />
        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  task: {
    flex: 1
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.35)' 
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  groupButton: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'flex-end'
  }
})