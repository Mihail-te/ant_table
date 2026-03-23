import { useEffect, useMemo, useState } from 'react';
import 'antd/dist/reset.css';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Space,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './App.css';

const initialSample = [
  { key: 1, name: 'Ivan', date: dayjs().format('YYYY-MM-DD'), amount: 100 },
  { key: 2, name: 'Olga', date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), amount: 200 },
];

export default function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setData(initialSample);
  }, []);

  const openAdd = () => {
    form.resetFields();
    setEditingKey(null);
    setIsModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingKey(record.key);
    form.setFieldsValue({ name: record.name, date: dayjs(record.date), amount: record.amount });
    setIsModalOpen(true);
  };

  const handleDelete = (key) => setData((prev) => prev.filter((r) => r.key !== key));

  const handleOk = async () => {
    const values = await form.validateFields();
    const row = {
      name: values.name,
      date: values.date.format('YYYY-MM-DD'),
      amount: values.amount,
    };
    if (editingKey == null) {
      const key = Date.now();
      setData((prev) => [...prev, { key, ...row }]);
    } else {
      setData((prev) => prev.map((r) => (r.key === editingKey ? { ...r, ...row } : r)));
    }
    setIsModalOpen(false);
  };

  const filtered = useMemo(() => {
    if (!search) return data;
    const s = search.toLowerCase();
    return data.filter((item) => {
      return (
        String(item.name).toLowerCase().includes(s) ||
        String(item.date).toLowerCase().includes(s) ||
        String(item.amount).toLowerCase().includes(s)
      );
    });
  }, [data, search]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
      render: (d) => dayjs(d).format('YYYY-MM-DD'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Delete note?" onConfirm={() => handleDelete(record.key)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Input
          placeholder="Search to table"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          Add
        </Button>
      </div>

      <Table columns={columns} dataSource={filtered} rowKey={(r) => r.key} />

      <Modal
        title={editingKey == null ? 'Add note' : 'Edit note'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save">
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Write name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Choose date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Count number"
            rules={[{ required: true, message: 'Write number' }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
