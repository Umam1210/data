import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { API } from "../config/API"
import { useMutation, useQuery } from 'react-query'

import { AiFillIdcard } from "react-icons/ai";


function EditModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // let { data: DataEdit } = useQuery("dataEdit", async () => {
  //   const response = await API.get("/data/" + props?.nik);
  //   return response.data;
  // });

  const [form, setForm] = useState({
    id: props?.id,
    nik: props?.nik,
    name: props?.name,
    gender: props?.gender,
    birth: props?.birth,
    address: props?.address,
    country: props?.country,
  });
  // useEffect(() => {
  //   if (DataEdit) {
  //     setForm({
  //       ...form,
  //       name: props?.name,
  //       gender: props?.gender,
  //       birth: props?.birth,
  //       address: props?.address,
  //       country: props?.country,
  //     });
  //   }
  // }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.post("/data", form);
      alert("berhasil edit data");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Button variant="warning" onClick={handleShow} className="mx-2">
        Edit
      </Button>

      <form className="mt-6" onSubmit={(e) => handleSubmit.mutate(e)}>
        <Modal show={show} onHide={handleClose}>
          <div className='d-flex flex-row mb-3'>
            <AiFillIdcard style={{ fontSize: "50" }} className="ms-4" />
            <h4 className='mt-2 ms-3'>Aplikasi Data Pribadi</h4>
          </div>
          <h4 className='ms-4'>Edit Data</h4>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="AddModalForm.ControlInput1">
                <p>NIK</p>
                <input
                  style={{ cursor: "not-allowed", backgroundColor:"grey"}}
                  type="text"
                  value={props?.nik}
                  name="nik"
                  onChange={handleChange}
                  className=" w-100 rounded"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="AddModalForm.ControlInput1">
                <p>Name</p>
                <input
                  type="text"
                  value={form?.name}
                  name="name"
                  onChange={handleChange}
                  className="w-100 rounded"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="AddModalForm.ControlInput1">
                <div className="">
                  <label htmlFor="" className="pb-2">
                    Jenis Kelamin
                  </label>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="Laki-Laki"
                      onChange={handleChange}
                      checked={form?.gender === "Laki-Laki"}
                    />
                    <label htmlFor="male" className="me-3 ms-1">
                      Laki-Laki
                    </label>

                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="Perempuan"
                      onChange={handleChange}
                      checked={form?.gender === "Perempuan"}
                    />
                    <label htmlFor="female" className=" ms-1">
                      Perempuan
                    </label>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-2" controlId="AddModalForm.ControlInput1">
                <p>Tanggal Lahir</p>
                <input
                  type="date"
                  id="date"
                  name="birth"
                  value={form?.birth}
                  onChange={handleChange}
                  required
                  className='w-100 rounded'
                />

              </Form.Group>
              <Form.Group
                className="mb-2"
                controlId="AddModalForm.ControlTextarea1"
              >
                <Form.Label>ALamat</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="address"
                  value={form?.address}
                  onChange={handleChange}
                  style={{ height: '100px' }}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <label htmlFor="country" className="mx-3 my-2">
            Negara
          </label>
          <select
            className="rounded py-1 ms-3"
            style={{ width: "94%" }}
            name="country"
            id="country"
            onChange={handleChange}
            required
            value={form?.country}
          >
            <option value="" selected disabled>
              kewarganegaraan
            </option>
            <option value="Indonesia">Indonesia</option>
            <option value="Jepang">Jepang</option>
            <option value="Thailand">Thailand</option>
            <option value="Korea Selatan">Korea Selatan</option>
            <option value="Rusia">Rusia</option>
            <option value="Eropa">Eropa</option>
            <option value="China">China</option>
          </select>
          <Modal.Footer >
            <Button variant="primary" type='submit'
              onClick={(e) => {
                handleClose()
                handleSubmit.mutate(e)
              }}
              className="w-25" >
              Simpan
            </Button>
            <Button variant="danger" onClick={handleClose} className="w-25">
              Kembali
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default EditModal