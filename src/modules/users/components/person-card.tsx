import React, { useState } from 'react';
import { Typography, Card, Button, Row, Col, Input } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { IPersonResonse } from '../types/IPersonRespoonse';
import './person-card.scss';
import DeleteModal from '../../common/del-modal/del-modal';

interface PersonCardProps extends IPersonResonse {
  deletePerson: (id: number) => void;
}
const PersonCard: React.FC<PersonCardProps> = ({ person, deletePerson }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editablePerson, setEditablePerson] = useState(person);

  const calculateAge = (dob: string): number => {
    return dayjs().diff(dayjs(dob), 'year');
  };
  const [editableAge, setEditableAge] = useState<number>(
    calculateAge(person.dob)
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { Title } = Typography;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'age') {
      const newAge = parseInt(value, 10);
      const newDob = dayjs().subtract(newAge, 'year').format('YYYY-MM-DD');
      setEditablePerson((prev) => ({ ...prev, dob: newDob }));
      setEditableAge(newAge);
    } else {
      setEditablePerson((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEditMode = () => {
    if (editableAge >= 18 || !editMode) {
      setEditMode(!editMode);
    } else {
      alert('Editing is only allowed for persons 18 years or older.');
    }
  };

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setIsModalVisible(false);
    deletePerson(person.id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        className='person-card mb-16'
        title={
          <Row>
            <Col xs={4}>
              <img
                className='img-size'
                src={person.picture}
                alt={person.first}
              />
            </Col>
            <Col>
              {editMode ? (
                <Input
                  name='first'
                  value={editablePerson.first}
                  onChange={handleInputChange}
                  className='mt-25'
                />
              ) : (
                <Title level={2}>
                  {person.first} {person.last}
                </Title>
              )}
            </Col>
          </Row>
        }
        extra={
          <Button
            type='link'
            icon={expanded ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setExpanded(!expanded)}
          ></Button>
        }
      >
        {expanded && (
          <>
            <Row gutter={16}>
              <Col xs={4}>
                <div className='title-style mt-16'>Age: </div>
                {editMode ? (
                  <Input
                    name='age'
                    type='number'
                    value={editableAge}
                    onChange={handleInputChange}
                    min={18}
                  />
                ) : (
                  `${editableAge} years`
                )}
              </Col>
              <Col xs={4}>
                <div className='title-style mt-16'>Gender: </div>
                {editMode ? (
                  <Input
                    name='gender'
                    value={editablePerson.gender}
                    onChange={handleInputChange}
                  />
                ) : (
                  person.gender
                )}
              </Col>
              <Col xs={4}>
                <div className='title-style mt-16'>Country:</div>
                {editMode ? (
                  <Input
                    name='country'
                    value={editablePerson.country}
                    onChange={handleInputChange}
                  />
                ) : (
                  person.country
                )}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col offset={1}>
                <div className='title-style mt-16'>Description:</div>
              </Col>
              <Col xs={24}>
                {editMode ? (
                  <Input.TextArea
                    name='description'
                    value={editablePerson.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  person.description
                )}
              </Col>
            </Row>
            <Row>
              <Col offset={19}>
                <Button
                  type='link'
                  icon={<EditOutlined />}
                  onClick={toggleEditMode}
                >
                  {editMode ? 'Save' : 'Edit'}
                </Button>
              </Col>

              <Col>
                <Button
                  type='link'
                  icon={<DeleteOutlined />}
                  onClick={showDeleteModal}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card>
      {isModalVisible && (
        <DeleteModal
          isModalVisible={isModalVisible}
          handleDelete={() => {
            handleDelete();
          }}
          handleCancel={() => {
            handleCancel();
          }}
        />
      )}
    </>
  );
};

export default PersonCard;
