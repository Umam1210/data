import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { API } from "../config/API"
import { useMutation } from 'react-query'

import { VscAdd } from "react-icons/vsc";
import { AiFillIdcard } from "react-icons/ai";

function AddModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    nik: "",
    name: "",
    gender: "",
    birth: "",
    address: "",
    country: "",
  });

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
      alert("berhasil menambah data");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="px-5 my-2">
        <VscAdd /> Add
      </Button>

      <form className="mt-6" onSubmit={(e) => handleSubmit.mutate(e)}>
        <Modal show={show} onHide={handleClose}>
          <div className='d-flex flex-row mb-3 mt-3'>
            <AiFillIdcard style={{ fontSize: "50" }} className="ms-4" />
            <h4 className='mt-2 ms-3'>Aplikasi Data Pribadi</h4>
          </div>
          <h4 className='ms-4'>Tambah Data Baru</h4>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-1" controlId="AddModalForm.ControlInput1">
                <p>NIK</p>
                <input
                  type="text"
                  name="nik"
                  onChange={handleChange}
                  className=" w-100 rounded"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="AddModalForm.ControlInput1">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-100 rounded"
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
                      required
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
                  onChange={handleChange}
                  required
                  className='w-100 rounded px-2 py-1'
                />

              </Form.Group>
              <Form.Group
                className="mb-2"
                controlId="AddModalForm.ControlTextarea1"
              >
                <Form.Label>ALamat</Form.Label>
                <Form.Control
                  className='border border-dark'
                  as="textarea"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  style={{ height: '100px' }}
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
          >
            <option value="" selected disabled
              className='w-50'
            >
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

export default AddModal