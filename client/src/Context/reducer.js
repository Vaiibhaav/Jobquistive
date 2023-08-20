import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
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
  POST_JOB_BEGIN,
  POST_JOB_SUCCESS,
  POST_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  GET_OPPORTUNITIES_BEGIN,
  GET_OPPORTUNITIES_SUCCESS,
  GET_CURRENT_OPPORTUNITY_DETAILS_BEGIN,
  GET_CURRENT_OPPORTUNITY_DETAILS_SUCCESS,
  GET_CURRENT_OPPORTUNITY_DETAILS_ERROR,
  SET_EDIT_JOB,
  SET_EDIT_OPPORTUNITY,
  SET_CURRENT_OPPORTUNITY,
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
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all details!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === REGISTER_RECRUITER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_RECRUITER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      recruiter: action.payload.recruiter,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting...",
    };
  }
  if (action.type === REGISTER_RECRUITER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      searchPosition: action.payload.user.aspiringPosition,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_RECRUITER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_RECRUITER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      recruiter: action.payload.recruiter,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }
  if (action.type === LOGIN_RECRUITER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // current opportunity details :
  if (action.type === GET_CURRENT_OPPORTUNITY_DETAILS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_CURRENT_OPPORTUNITY_DETAILS_SUCCESS) {
    return {
      ...state,
      currentOpportunity: action.payload.currentOpportunity,
      isLoading: false,
    };
  }
  if (action.type === GET_CURRENT_OPPORTUNITY_DETAILS_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      recruiter: null,
      token: null,
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      searchPosition: action.payload.user.aspiringPosition,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  //applied job :

  if (action.type === APPLIED_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === APPLIED_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Applied Job successfully!",
    };
  }
  if (action.type === APPLIED_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === UPDATE_RECRUITER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_RECRUITER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      recruiter: action.payload.recruiter,
      token: action.payload.token,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_RECRUITER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: "",
      jobType: "Full-Time",
      status: "Pending",
      jobDescription: "",
    };
    return { ...state, ...initialState };
  }
  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Job Created!",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === POST_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === POST_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Job Posted!",
    };
  }
  if (action.type === POST_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === GET_OPPORTUNITIES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_OPPORTUNITIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      opportunities: action.payload.opportunities,
    };
  }

  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, jobLocation, jobType, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }

  if (action.type === SET_EDIT_OPPORTUNITY) {
    const job = state.opportunities.find(
      (job) => job._id === action.payload.id
    );
    const { _id, position, company, jobLocation, jobType, jobDescription } =
      job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      jobDescription,
    };
  }

  if (action.type === SET_CURRENT_OPPORTUNITY) {
    return {
      ...state,
      currentOpportunityId: action.payload.id,
      isLoading: true,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Updated!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_OPPORTUNITY_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_OPPORTUNITY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Opportunity Updated!",
    };
  }
  if (action.type === EDIT_OPPORTUNITY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "All",
      searchType: "All",
      sort: "Latest",
      searchPosition: action.payload.user.aspiringPosition,
    };
  }
  if (action.type === CLEAR_FILTERS_RECRUITER) {
    return {
      ...state,
      search: "",
      searchYoe: "All",
      searchGender: "All",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
