import { Col, Input, Row } from 'antd';
import celebrities from '../data/celebrities.json';
import PersonCard from '../components/person-card';
import { useState } from 'react';
import { IPerson } from '../types/IPersonRespoonse';

const Users = () => {
  const [search, setSearch] = useState<string>('');
  const [persons, setPersons] = useState<IPerson[]>(celebrities);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };
  const filteredData = persons.filter((person) =>
    person.first.toLowerCase().includes(search)
  );

  const handleDeletePerson = (id: number) => {
    setPersons((prevPersons) =>
      prevPersons.filter((person) => person.id !== id)
    );
  };
  return (
    <Row justify='center' align='middle'>
      <Col xs={12}>
        <Input
          placeholder='Search by name'
          value={search}
          onChange={handleSearch}
          style={{ marginBottom: '20px' }}
        />
      </Col>

      {filteredData.length > 0 ? (
        filteredData.map((person) => (
          <Col key={person.id} xs={24} offset={12}>
            <Col xs={12}>
              <PersonCard person={person} deletePerson={handleDeletePerson} />
            </Col>
          </Col>
        ))
      ) : (
        <Col span={24} style={{ textAlign: 'center' }}>
          <p>No results found</p>
        </Col>
      )}
    </Row>
  );
};

export default Users;
