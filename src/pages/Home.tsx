import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const found = tasks.find(task => task.title === newTaskTitle);

    if (found) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome!');
    } else {
      const newTask: Task = {
        done: false,
        title: newTaskTitle,
        id: new Date().getTime()
      };

      setTasks(tasks => [...tasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done;
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
    [
      {
        text: 'NÃO',
        style: 'cancel',
      },
      { 
        text: 'SIM',
        onPress: () => setTasks(tasks => tasks.filter(task => task.id !== id))
      }
    ]);
  }

  function handleEditTask(id: number, taskNewTitle: string, resetPreviousTaskValue: Function) {
    const found = tasks.find(task => task.title === taskNewTitle);

    if (found && found.id !== id) {
      resetPreviousTaskValue();
      Alert.alert('Task já existente', 'Você não pode alterar uma task com o nome já existente!');
    } else {
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          task.title = taskNewTitle;
        }
  
        return task;
      });
  
      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
        toggleTaskDone={handleToggleTaskDone}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})