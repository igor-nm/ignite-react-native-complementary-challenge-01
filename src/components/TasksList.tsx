import React from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { TaskItem } from './TaskItem';
import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'

export interface Task {
  id: number;
  done: boolean;
  title: string;
}

interface TasksListProps {
  tasks: Task[];
  editTask: (id: number, taskNewTitle: string, resetPreviousTaskValue: Function) => void;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
}

export function TasksList({ tasks, editTask, removeTask, toggleTaskDone }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              task={item}
              index={index}
              editTask={editTask}
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}