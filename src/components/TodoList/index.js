import { Button, Col, Input, Row, Select, Tag } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import todoListFilter from '../../redux/selectors';
import Todo from '../Todo';
import { addNewTodos, addTodoList, addTodos } from './todoListSlice';

export default function TodoList() {
  const dispatch = useDispatch()
  const todoListRemaining = useSelector(todoListFilter)
  const [todoValue, setTodoValue] = useState('')
  const [priorty, setPriorty] = useState('Medium')
  const handletodoValueChange = (e) => {
    setTodoValue(e.target.value)
  }

  const handlePriortyChange = (value) => {
    setPriorty(value)
  }
  const handleAddTodo = () => {
    const data = {
      id: uuidv4(),
      name: todoValue,
      priorty,
      completed: false
    }
    const action = addNewTodos(data)
    dispatch(action)
    setTodoValue('')
    setPriorty('Medium')
  }
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoListRemaining.map(todo => (
          <Todo id={todo.id} key={todo.id} name={todo.name} prioriry={todo.priorty} completed={todo.completed} />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoValue} onChange={handletodoValueChange} />
          <Select defaultValue="Medium" value={priorty} onChange={handlePriortyChange} >
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddTodo}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}