import React, { useState, useEffect } from 'react'
import Headers from '../../../Shared/Components/Header/Headers'
import axios from 'axios'
import { ClipLoader } from "react-spinners";
import NoData from '../../../Shared/Components/NoData/NoData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import nodata from '../../../../assets/images/nodata.png'
import Table from 'react-bootstrap/Table';
import { axiosInstant, USERS_URLS } from '../../../../Serviece/Url';

export default function UsersList() {
  let [usersData, setUsersData] = useState(null);
  let [isLOading, setisLOding] = useState(false);
  let [IsOpenedUsersID, setIsOpenedUsersID] = useState(null);
  let [ArrOFPageNO, setArrOFPageNO] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);   
let[NameValue,setNameValue]=useState("")

  // modal for delete
  const [show, setShow] = useState(false);
  const [deleateid, setdeleteid] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setdeleteid(id)
    setShow(true);
  }
  let baseIMg = 'https://upskilling-egypt.com:3006/'

  // get users data
  function getUsersData(pageSize, pageNumber,userName) {
    setisLOding(true)
    axiosInstant.get(USERS_URLS.GET_USERS(), {
      params: {
        pageSize,
        pageNumber,
       userName
      },
    }
    )
      .then((res) => {
        setUsersData(res.data.data)
        let ResipePages = (res.data.totalNumberOfPages)
        setArrOFPageNO(Array(ResipePages).fill().map((_, i) => i + 1))
        setCurrentPage(pageNumber)  
        setisLOding(false)
      })
      .catch((err) => {
        setisLOding(false)
        console.log(err)
      })
  }

  // delete User
  function deleateUser(id) {
    axiosInstant.delete(USERS_URLS.DELETE_USER(id))
      .then((res) => {
        handleClose()
        getUsersData(10, currentPage)
        toast.success("User item deleted Successfully")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // toggle dropDown
  function toggleMenue(id) {
    setIsOpenedUsersID(IsOpenedUsersID === id ? null : id)
  }

  let getNameValue=(input)=>{
  console.log(input.target.value)
setNameValue(input.target.value)
getUsersData(4,1,input.target.value)
}

  useEffect(() => {
    getUsersData(10, 1)
    const handleClickOutside = () => {
      setIsOpenedUsersID(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [])

  return (
    <>
      <Headers title1={'Users'} title2={'List'}
        description={'You can now add your items that any user can order it from the Application and you can edit'}
      />
      <div className="container">
        <div className="ResipeTitle d-flex justify-content-between align-items-center p-3">
          <div className="decreption">
            <h4>Users Table Details</h4>
            <p className=' text-muted'>You can check all details</p>
          </div>
        </div>

        {isLOading ? <div className='d-flex justify-content-center align-items-center'><ClipLoader
          color={'green'}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /></div> : <></>}
      <input type="text" className=' form-control ms-4 rounded-2 mb-2' onChange={getNameValue}  placeholder='search by name.......'/>

        {usersData?.length > 0 ? <Table striped bordered hover className='ms-4'>
          <thead>
            <tr className=' text-center'>
              <th>userName</th>
              <th>image</th>
              <th>country</th>
              <th>email</th>
              <th>phoneNumber</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.map((UserItem) => <tr key={UserItem.id} className=' text-center'>
              <td>{UserItem.userName}</td>
              <td>{UserItem.imagePath !== null ? <img src={`${baseIMg}${UserItem.imagePath}`} style={{ width: "30px" }} /> : <img src={nodata} style={{ width: "30px" }} />}</td>
              <td>{UserItem.country}</td>
              <td>{UserItem.email}</td>
              <td>{UserItem.phoneNumber}</td>
              <td className=' position-relative'><i className="bi bi-three-dots" onClick={(e) => { toggleMenue(UserItem.id); e.stopPropagation() }} style={{ cursor: "pointer" }}></i>
                {UserItem.id === IsOpenedUsersID && <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "-70px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                    zIndex: 10
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <div className="p-2" style={{ cursor: "pointer" }}><i className="fas fa-eye mx-2" style={{ color: 'rgba(0, 146, 71, 1)' }}></i>View</div>
                  <div className="p-2 " style={{ cursor: "pointer" }}> <i className="fas fa-trash mx-2" onClick={() => handleShow(UserItem.id)} style={{ color: 'rgba(0, 146, 71, 1)' }} ></i>Delete</div>
                </div>}
              </td>
            </tr>)}
          </tbody>
        </Table> : <div className=' text-center'><NoData /></div>}

        <nav aria-label="Page navigation example">
          <ul className="pagination">

            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => currentPage > 1 && getUsersData(10, currentPage - 1)}
            >
              <span className="page-link">Previous</span>
            </li>

            <li
              className={`page-item ${currentPage === 1 ? "active" : ""}`}
              onClick={() => getUsersData(10, 1)}
            >
              <span className="page-link">1</span>
            </li>

            {currentPage > 4 && (
              <li className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            )}

            {ArrOFPageNO.filter(
              (page) =>
                page !== 1 &&
                page !== ArrOFPageNO.length &&
                page >= currentPage - 2 &&
                page <= currentPage + 2
            ).map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
                onClick={() => getUsersData(10, page)}
              >
                <span className="page-link">{page}</span>
              </li>
            ))}

            {/* نقط لو فيه فجوة قبل آخر صفحة */}
            {currentPage < ArrOFPageNO.length - 3 && (
              <li className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            )}

            {ArrOFPageNO.length > 1 && (
              <li
                className={`page-item ${currentPage === ArrOFPageNO.length ? "active" : ""}`}
                onClick={() => getUsersData(10, ArrOFPageNO.length)}
              >
                <span className="page-link">{ArrOFPageNO.length}</span>
              </li>
            )}

            <li
              className={`page-item ${currentPage === ArrOFPageNO.length ? "disabled" : ""}`}
              onClick={() =>
                currentPage < ArrOFPageNO.length && getUsersData(10, currentPage + 1)
              }
            >
              <span className="page-link">Next</span>
            </li>

          </ul>
        </nav>

        {/* delete modal users */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body className=' text-center'>
            <img src={nodata} alt="" className=' ' />
            <h4>Delete This User ?</h4>
            <p className=' text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </Modal.Body  >
          <Modal.Footer>
            <Button onClick={() => deleateUser(deleateid)} className='btn btn-outline-danger btn-light '>
              Delete This item
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}