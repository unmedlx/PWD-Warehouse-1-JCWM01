// import React, { useState, useEffect } from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { API_URL } from '../helper';



// const ProfileData = ({ handleClose }) => {
//     const userGlobal = useSelector((state) => state.users);
//     const { idUser } = userGlobal
//     const [userData, setuserData] = useState({})
//     const { fullName, username, email, userImage, idRole, gender, dateOfBirth } = userData
//     const userLocalStorage = localStorage.getItem("token_shutter");

//     const profileDataInitialValues = {
//         //diisi dari redux
//         username: username,
//         dateOfBirth: dateOfBirth,
//         email: email,
//         gender: gender,
//         fullName: fullName
//     }

//     const profileDataValidationSchema = Yup.object().shape({
//         username: Yup.string().required("Username is required"),
//         // dateOfBirth: Yup.string().required("Date of birth is required"),
//         email: Yup.string().email("Email must be a valid email").required("Email is required"),
//         gender: Yup.number(),
//         fullName: Yup.string().required("Full name is required")
//     })

//     //Mauskkan data ke database
//     const onSubmit = (data) => {
//         console.log(data);
//         const userLocalStorage = localStorage.getItem("token_shutter")
//         axios.patch(`${API_URL}/users/edit`,
//             data,
//             {
//                 headers: {
//                     authorization: `Bearer ${userLocalStorage}`,
//                 }
//             }

//         )
//             .then((res) => {
//                 console.log(res);
//                 alert("Berhasil Update Data")
//                 setuserData(res.data[0])
//                 // handleClose()
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }

//     const fetchDataUser = async () => {
//         try {
//             const getDataUser = await axios.post(`${API_URL}/users/`,
//                 {},
//                 {
//                     headers: {
//                         authorization: `Bearer ${userLocalStorage}`,
//                     },
//                 }
//             )

//             console.log(getDataUser.data.idRole);
//             delete getDataUser.data.password;
//             console.log(getDataUser.data);
//             setuserData(getDataUser.data)



//         } catch (error) {

//         }
//     }

//     useEffect(() => {
//         fetchDataUser()
//     }, [])
//     useEffect(() => {

//     }, [userData])

//     return (
//         <>
//             <p><strong>Biodata Diri</strong></p>
//             <Formik initialValues={profileDataInitialValues}
//                 onSubmit={onSubmit}
//                 validationSchema={profileDataValidationSchema}
//                 enableReinitialize={true}
//             >
//                 <Form>
//                     <div className="profile-main-data">

//                         <div className="input-container">
//                             <ErrorMessage name="username" component="span" className="error-message" />
//                             <Field type="text" autocomplete="off" className="input-field" name="username" placeholder="Username" disabled />
//                         </div>
//                         <div className="input-container">
//                             <ErrorMessage name="dateOfBirth" component="span" className="error-message" />
//                             <Field type="date" autocomplete="off" className="input-field" name="dateOfBirth" placeholder="Date of Birth" />
//                         </div>
//                         <div className="input-container">
//                             <ErrorMessage name="email" component="span" className="error-message" />
//                             <Field type="text" autocomplete="off" className="input-field" name="email" placeholder="Email" />
//                         </div>
//                         <div className="input-container">
//                             <ErrorMessage name="gender" component="span" className="error-message" />
//                             <Field as="select" autocomplete="off" className="input-field" name="gender" placeholder="Gender">
//                                 <option value="1">Male</option>
//                                 <option value="2" selected>Female</option>
//                                 <option value="3">Rather not to mention</option>
//                             </Field>
//                         </div>
//                         <div className="input-container">
//                             <ErrorMessage name="fullName" component="span" className="error-message" />
//                             <Field type="text" autocomplete="off" className="input-field" name="fullName" placeholder="Fullname" />
//                         </div>
//                     </div>
//                     <button type="submit" className="btn btn-warning">Edit Data</button>
//                 </Form>
//             </Formik>

//         </>
//     )
// }

// export default ProfileData
