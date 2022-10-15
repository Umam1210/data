import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillIdcard } from "react-icons/ai";
import { Card, Form, InputGroup, Table } from 'react-bootstrap';

import { useState } from 'react'
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import DetailModal from './components/DetailModal';
import DeleteModal from './components/DeleteModal';

import { useQuery } from 'react-query'
import { API } from '../src/config/API'


function App() {
  const [search, setSearch] = useState('');
  const [searchName, setSearchName] = useState('');

  let { data } = useQuery("data", async () => {
    const response = await API.get("/data");
    return response.data;
  });

  console.log(data);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <>
      <div className='d-flex flex-row mb-3'>

        <AiFillIdcard style={{ fontSize: "100" }} />
        <h1 className='mt-4 ms-3'>Aplikasi Data Pribadi</h1>
      </div>
      <div className='d-flex justify-content-center'>

        <Card style={{ width: '90%' }}>
          <Card.Body>
            <Form className='w-100'>
              <h4>NIK</h4>
              <InputGroup className='my-3 w-25'>

                {/* onChange for search */}
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search here...'
                  className='w-100'
                />
              </InputGroup>
            </Form>
            <Form className='w-25'>
              <h4>Name</h4>
              <InputGroup className='my-3 w-100'>

                {/* onChange for search */}
                <Form.Control
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder='Search here...'
                  className='w-100'
                />
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className='mt-3 mx-5'>
        <div className='d-flex justify-content-end me-5'>
          <AddModal />
        </div>

        <Table striped bordered hover size="sm">
          <thead >
            <tr className='bg-primary '>
              <th>NIK</th>
              <th>Nama</th>
              <th>Umur</th>
              <th>Jenis kelamin</th>
              <th>Tanggal lahir</th>
              <th>Alamat</th>
              <th>Negara</th>
              <th className='d-flex justify-content-center'>Action</th>
            </tr>
          </thead>
          {data?.filter((item) => {
            return search.toLowerCase() === ''
              ? item : item.nik.toLowerCase().includes(search);
          }).map((item, id) => {
            return (

              <tbody key={id}>
                <tr>
                  <td>{item?.nik}</td>
                  <td>{item?.name}</td>
                  <td>{getAge(item?.birth)} tahun</td>
                  <td>{item?.gender}</td>
                  <td>{item?.birth}</td>
                  <td>{item?.address}</td>
                  <td>{item?.country}</td>
                  <td className='d-flex justify-content-center p-0'>
                    <DetailModal
                      nik={item?.nik}
                      name={item?.name}
                      birth={item?.birth}
                      age={getAge(item?.birth)}
                      gender={item?.gender}
                      address={item?.address}
                      country={item?.country}

                    />
                    <p>_</p>
                    <EditModal
                      nik={item?.nik}
                      // name={item?.name}
                      // birth={item?.birth}
                      // gender={item?.gender}
                      // address={item?.address}
                      // country={item?.country}
                    />
                    <p>_</p>
                    <DeleteModal
                      nik={item?.nik}
                    />
                  </td>
                </tr>
              </tbody>
            )
          })}
        </Table>
      </div>
    </>
  );
}

export default App;
