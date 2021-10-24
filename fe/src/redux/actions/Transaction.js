import axios from "axios";
import { API_URL } from "../../constants/API";

export const fetchOngoingTransaction = (idUser, page, sortBy) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION",
      });

      console.log(page, idUser, sortBy);
      const { data } = await axios.get(`${API_URL}/transaction?idUser=${idUser}&page=${page}&status=&sortBy=${sortBy}&type=ongoing&limit=3`);
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_COMPLETE",
        payload: data,
      });
      console.log(data);
      return data;
    } catch (error) {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_FAILED",
        payload: error,
      });
    }
  };
};

export const fetchDetailTransaction = (idTransaction) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FETCH_DETAIL_TRANSACTION",
      });
      const getTransactionDetail = await axios.get(`${API_URL}/checkout/${idTransaction}`);
      dispatch({
        type: "FETCH_DETAIL_TRANSACTION_COMPLETE",
        payload: getTransactionDetail.data,
      });
      // console.log(getTransactionDetail.data.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTransactionById = (idTransaction) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FETCH_DETAIL_TRANSACTION",
      });
      const getTransactionData = await axios.get(`${API_URL}/transaction/detail/${idTransaction}`);
      console.log(getTransactionData.data);
      dispatch({
        type: "FETCH_DETAIL_TRANSACTION_COMPLETE",
        payload: getTransactionData.data.dataDetailTransaction[0],
      });
      // console.log(getTransactionData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTransaction = (idUser, page, sortBy, status, invoice) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION",
      });


      console.log(invoice);
      let getQuery = `${API_URL}/transaction?idUser=${idUser}&page=${page}&status=${status}&sortBy=${sortBy}&invoice=${invoice}&type=all&limit=5`
      console.log(getQuery);
      const { data } = await axios.get(`${API_URL}/transaction?idUser=${idUser}&page=${page}&status=${status}&sortBy=${sortBy}&invoice=${invoice}&type=all&limit=5`)
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_COMPLETE",
        payload: data
      })
      return data

    } catch (error) {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_FAILED",
        payload: error,
      });
    }
  }
}


// get admin transaction data
export const fetchAdminViewTransaction = (idWarehouse, page, status, sortBy, invoice) => {
  return async dispatch => {
    try {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION"
      })

      const { data } = await axios.get(`${API_URL}/transaction/admintransaction?idRole=2&idWarehouse=${idWarehouse}&page=${page}&status=${status}&sortBy=${sortBy}&invoice=${invoice}`)
      console.log(data.data, "INI DATA BARU");
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_COMPLETE",
        payload: data
      })
      return data
    } catch (error) {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_FAILED",
        payload: error
      })

    }
  }
}

// get super admin transaction data
export const fetchSuperAdminViewTransaction = (idWarehouse, page, status, sortBy, invoice) => {
  return async dispatch => {
    try {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION"
      })

      const { data } = await axios.get(`${API_URL}/transaction/super-admin-transaction?&idWarehouse=${idWarehouse}&page=${page}&status=${status}&sortBy=${sortBy}&invoice=${invoice}`)
      console.log(data.data, "INI DATA BARU");
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_COMPLETE",
        payload: data
      })
      return data
    } catch (error) {
      dispatch({
        type: "FETCH_ONGOING_TRANSACTION_FAILED",
        payload: error
      })

    }
  }
}


// PaymentProof
export const paymentAccepted = (idTransaction) => {
  return async dispatch => {
    await axios.patch(`${API_URL}/transaction/admin-payment?paymentStatus=accepted&idTransaction=${idTransaction}`)


  }
}
export const paymentDeclined = (idTransaction) => {
  return async dispatch => {
    await axios.patch(`${API_URL}/transaction/admin-payment?paymentStatus=declined&idTransaction=${idTransaction}`)
  }
}

// Change Status to deliver (7)
export const changeStatus = (idTransaction, idStatus) => {
  return async dispatch => {
    await axios.patch(`${API_URL}/transaction/transaction-status?idTransaction=${idTransaction}&idStatus=${idStatus}`)
  }
}

// delete adminstock
export const deleteAdminStock = (idWarehouse, idTransaction) => {
  return async dispatch => {
    await axios.post(`${API_URL}/adminstocks/admin-stocks?idWarehouse=${idWarehouse}&idTransaction=${idTransaction}`)
  }
}


export const returnUserStock = (idWarehouse, idTransaction) => {
  return async dispatch => {
    await axios.post(`${API_URL}/userstocks/user-stocks?idWarehouse=${idWarehouse}&idTransaction=${idTransaction}`)
  }
}

