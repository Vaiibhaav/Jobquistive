import React, { useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_RECRUITER_BEGIN,
  REGISTER_RECRUITER_SUCCESS,
  REGISTER_RECRUITER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_RECRUITER_BEGIN,
  LOGIN_RECRUITER_SUCCESS,
  LOGIN_RECRUITER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_RECRUITER_BEGIN,
  UPDATE_RECRUITER_SUCCESS,
  UPDATE_RECRUITER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  APPLIED_JOB_BEGIN,
  APPLIED_JOB_SUCCESS,
  APPLIED_JOB_ERROR,
  GET_CURRENT_OPPORTUNITY_DETAILS_BEGIN,
  GET_CURRENT_OPPORTUNITY_DETAILS_SUCCESS,
  POST_JOB_BEGIN,
  POST_JOB_SUCCESS,
  POST_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  GET_OPPORTUNITIES_BEGIN,
  GET_OPPORTUNITIES_SUCCESS,
  SET_EDIT_JOB,
  SET_EDIT_OPPORTUNITY,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  EDIT_OPPORTUNITY_BEGIN,
  EDIT_OPPORTUNITY_SUCCESS,
  EDIT_OPPORTUNITY_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CLEAR_FILTERS_RECRUITER,
  CHANGE_PAGE,
  SET_CURRENT_OPPORTUNITY,
} from "./actions";

const user = localStorage.getItem("user");
const recruiter = localStorage.getItem("recruiter");
const token = localStorage.getItem("token");

const initialState = {
  isLoading: false, // changed
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user && user !== "undefined" ? JSON.parse(user) : null,
  fileId: "",
  recruiter:
    recruiter && recruiter !== "undefined" ? JSON.parse(recruiter) : null,
  token: token,
  showSidebar: false,
  // recruiter
  companyName: "",
  //jobs
  isEditing: false,
  editJobId: "",
  position: "Software Engineer",
  positionOptions: [
    "Software Engineer",
    "Product Manager",
    "Sales Manager",
    "Data Scientist",
  ],
  company: "",
  jobLocation: "",
  jobTypeOptions: ["Full-Time", "Part-Time", "Remote", "Internship"],
  jobType: "Full-Time",
  jobDescription: "",
  statusOptions: ["Pending", "Interview", "Declined"],
  status: "Pending",
  jobs: [],
  opportunities: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "All",
  searchType: "All",
  searchPosition: "All",
  searchYoe: "All",
  searchGender: "All",
  sort: "Latest",
  sortOptions: ["Latest", "Oldest", "A-Z", "Z-A"],
  currentOpportunityId: "",
  currentOpportunity: {},
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const fetchAuth = axios.create({
    baseURL: "api/v1",
  });
  //requests
  fetchAuth.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  fetchAuth.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, recruiter, token }) => {
    localStorage.setItem("recruiter", JSON.stringify(recruiter));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("recruiter");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "/api/v1/user-auth/register-user",
        currentUser
      );
      console.log("RES REGISTER", response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const registerRecruiter = async (currentUser) => {
    dispatch({ type: REGISTER_RECRUITER_BEGIN });
    try {
      const response = await axios.post(
        "/api/v1/recruiter-auth/register-recruiter",
        currentUser
      );
      console.log(response);
      const { recruiter, token } = response.data;
      dispatch({
        type: REGISTER_RECRUITER_SUCCESS,
        payload: { recruiter, token },
      });
      addUserToLocalStorage({ recruiter, token });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_RECRUITER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        "/api/v1/user-auth/login-user",
        currentUser
      );
      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const loginRecruiter = async (currentUser) => {
    dispatch({ type: LOGIN_RECRUITER_BEGIN });
    try {
      const response = await axios.post(
        "/api/v1/recruiter-auth/login-recruiter",
        currentUser
      );
      console.log(response);
      const { recruiter, token } = response.data;
      dispatch({
        type: LOGIN_RECRUITER_SUCCESS,
        payload: { recruiter, token },
      });
      addUserToLocalStorage({ recruiter, token });
    } catch (error) {
      dispatch({
        type: LOGIN_RECRUITER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await fetchAuth.patch(
        "/user-auth/update-user",
        currentUser
      );
      const { user, token, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, location },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.message },
        });
      }
    }
    clearAlert();
  };

  const updateRecruiter = async (currentUser) => {
    dispatch({ type: UPDATE_RECRUITER_BEGIN });
    try {
      const { data } = await fetchAuth.patch(
        "/recruiter-auth/update-recruiter",
        currentUser
      );
      const { recruiter, token } = data;

      dispatch({
        type: UPDATE_RECRUITER_SUCCESS,
        payload: { recruiter, token },
      });

      addUserToLocalStorage({ recruiter, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_RECRUITER_ERROR,
          payload: { msg: error.response.data.message },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await fetchAuth.post("/user-jobs", {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: CREATE_JOB_SUCCESS,
      });
      //dispatch({ type: CLEAR_VALUES })
      clearValues();
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: { msg: error.response.data.message },
        });
      }
    }
    clearAlert();
  };

  // user applied job:
  const appliedJob = async (_id, fileId, salaryExpectation) => {
    dispatch({ type: APPLIED_JOB_BEGIN });
    try {
      const { user } = state;
      await fetchAuth.patch(`/user-jobs/apply/${_id}`, {
        user,
        fileId,
        salaryExpectation,
      });
      dispatch({
        type: APPLIED_JOB_SUCCESS,
      });
      clearValues();
      getAllOpportunitiesUser();
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: APPLIED_JOB_ERROR,
          payload: { msg: error.response.data.message },
        });
      }
    }
    clearAlert();
  };

  // Recruiter posted job :
  const postJob = async () => {
    dispatch({ type: POST_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, jobDescription } = state;

      await fetchAuth.post("/recruiter-jobs", {
        company,
        position,
        jobLocation,
        jobType,
        jobDescription,
        usersApplied: [],
      });
      dispatch({
        type: POST_JOB_SUCCESS,
      });
      //dispatch({ type: CLEAR_VALUES })
      clearValues();
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: POST_JOB_ERROR,
          payload: { msg: error.response.data.message },
        });
      }
    }
    clearAlert();
  };

  const getAllJobs = async () => {
    // will add page later
    const { page, search, searchStatus, searchType, sort } = state;
    let url = `/user-jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await fetchAuth.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAllOpportunitiesRecruiter = async () => {
    // will add page later
    let url = `/recruiter-jobs`;
    dispatch({ type: GET_OPPORTUNITIES_BEGIN });
    try {
      const { data } = await fetchAuth.get(url);
      const opportunities = data.jobs;
      const result = opportunities.filter(
        (opportunity) => opportunity.createdBy === state.recruiter._id
      );

      dispatch({
        type: GET_OPPORTUNITIES_SUCCESS,
        payload: {
          opportunities: result,
        },
      });
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };

  const getAllOpportunitiesUser = async () => {
    const { page, search, searchPosition, searchType, sort } = state;
    let url = `/user-jobs/opportunities?page=${page}&position=${searchPosition}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    // let url = `/user-jobs/opportunities`;
    dispatch({ type: GET_OPPORTUNITIES_BEGIN });
    try {
      const { data } = await fetchAuth.get(url);
      const opportunities = data.jobs;
      dispatch({
        type: GET_OPPORTUNITIES_SUCCESS,
        payload: {
          opportunities,
        },
      });
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };

  // Get all jobs applied by user :

  const getAppliedOpportunitiesUser = async () => {
    let url = `/user-jobs/applied-jobs`;
    dispatch({ type: GET_OPPORTUNITIES_BEGIN });
    try {
      const { data } = await fetchAuth.get(url);
      const opportunities = data.appliedJobs;
      dispatch({
        type: GET_OPPORTUNITIES_SUCCESS,
        payload: {
          opportunities,
        },
      });
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const setEditOpportunity = (id) => {
    dispatch({ type: SET_EDIT_OPPORTUNITY, payload: { id } });
  };

  const setCurrentOpportunity = (id) => {
    dispatch({ type: SET_CURRENT_OPPORTUNITY, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await fetchAuth.patch(`/user-jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const editOpportunity = async () => {
    dispatch({ type: EDIT_OPPORTUNITY_BEGIN });
    try {
      const { position, company, jobLocation, jobType, jobDescription } = state;

      await fetchAuth.patch(`/recruiter-jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        jobDescription,
      });
      dispatch({
        type: EDIT_OPPORTUNITY_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_OPPORTUNITY_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await fetchAuth.delete(`/user-jobs/${jobId}`);
      getAllJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const deleteOpportunity = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await fetchAuth.delete(`/recruiter-jobs/${jobId}`);
      // getAllJobs();
      getAllOpportunitiesRecruiter();
    } catch (error) {
      logoutUser();
    }
  };

  // current opportunity details by recruiter :

  const getCurrentOpportunityDetails = async () => {
    let url = `/recruiter-jobs/opportunity/${state.currentOpportunityId}`;
    dispatch({ type: GET_CURRENT_OPPORTUNITY_DETAILS_BEGIN });
    try {
      const { data } = await fetchAuth.get(url);
      const currentOpportunity = data.job;
      dispatch({
        type: GET_CURRENT_OPPORTUNITY_DETAILS_SUCCESS,
        payload: {
          currentOpportunity,
        },
      });
    } catch (error) {
      console.log(error);
      logoutUser();
    }
    clearAlert();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await fetchAuth.get("/user-jobs/stats");
      const { defaultStats, monthlyApplications } = data;
      // console.log(defaultStats); // Output: "object"
      // console.log(monthlyApplications); // Output: "object"
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: { stats: defaultStats, monthlyApplications },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    const { user } = state;
    dispatch({ type: CLEAR_FILTERS, payload: { user } });
    // getAllJobs();
  };

  const clearFiltersRecruiter = () => {
    const { recruiter } = state;
    dispatch({ type: CLEAR_FILTERS_RECRUITER, payload: { recruiter } });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        registerRecruiter,
        loginUser,
        loginRecruiter,
        toggleSidebar,
        logoutUser,
        updateUser,
        updateRecruiter,
        handleChange,
        clearValues,
        createJob,
        appliedJob,
        postJob,
        getAllJobs,
        getAllOpportunitiesRecruiter,
        getAllOpportunitiesUser,
        getCurrentOpportunityDetails,
        setEditJob,
        setEditOpportunity,
        deleteJob,
        deleteOpportunity,
        editJob,
        editOpportunity,
        showStats,
        clearFilters,
        clearFiltersRecruiter,
        changePage,
        setCurrentOpportunity,
        getAppliedOpportunitiesUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
