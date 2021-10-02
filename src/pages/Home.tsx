import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTaskTitle1 = tasks.find(task => 
      task.title === newTaskTitle
    )

    if (newTaskTitle1) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [{
        text: 'Ok',
        onPress: () => console.log('OK Pressed')
      }]) 
    } else {
      const data = {
        id: (new Date().getTime()),
        title: newTaskTitle,
        done: false 
      }
      setTasks(oldState => [...oldState, data])  
    }

  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    // const updatedTasks = tasks.map(task => { 
    //   if (task.id === id) {
    //      task.done = !task.done }
    //   return task
    // })
    // setTasks(updatedTasks)

    const index = tasks.findIndex(task => task.id === id);
    tasks[index].done = !tasks[index].done;
    setTasks([...tasks])
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Clicou não')
        },
        {
          text: 'Sim',
          onPress: () => {
            console.log('Clicou sim')
            setTasks(oldState => oldState.filter(
              tasks => tasks.id !== id))
          }
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => { 
      if (task.id === taskId) {
         task.title = taskNewTitle }
      return task
    })
    setTasks(updatedTasks)
  }
  
  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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