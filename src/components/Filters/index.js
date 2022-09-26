import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterPriorty, filterSearch, filterStatus } from './filtersSlice';

const { Search } = Input;


export default function Filters() {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [statusValue, setStatusValue] = useState('All')
  const [priortyValue, setPriortyValue] = useState([])
  const hanldeFilterSearch = (e) => {
    setSearchValue(e.target.value)
    const action = filterSearch(e.target.value)
    dispatch(action)
  }

  const handleFilterStatus = (e) => {
    setStatusValue(e.target.value)
    const action = filterStatus(e.target.value)
    dispatch(action)
  }

  const handleFilterPriorty = (value) => {
    setPriortyValue(value)
    const action = filterPriorty(value)
    dispatch(action)
  }
  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search placeholder='input search text' value={searchValue} onChange={hanldeFilterSearch} />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={statusValue} onChange={handleFilterStatus}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select value={priortyValue} onChange={handleFilterPriorty}
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
        >
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
      </Col>
    </Row>
  );
}