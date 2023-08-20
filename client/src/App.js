import {
  Error,
  Landing,
  Register,
  RegisterRecruiter,
  ProtectedRoute,
} from "./pages";
import {
  AddJob,
  AllJobs,
  Stats,
  Profile,
  SharedLayout,
  Opportunities,
  AppliedOpportunities,
} from "./pages/dashboard";
import {
  RecruiterProfile,
  PostJob,
  AllOpportunities,
  OpportunityDetails,
} from "./pages/recruiter-dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppContext } from "./Context/appContext.js";

function App() {
  const { user, recruiter } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {user && <Route index element={<Stats />} />}

          {user && <Route path="profile" element={<Profile />} />}
          {user && <Route path="add-job" element={<AddJob />} />}
          {user && <Route path="all-jobs" element={<AllJobs />} />}
          {user && <Route path="opportunities" element={<Opportunities />} />}
          {user && (
            <Route
              path="applied-opportunities"
              element={<AppliedOpportunities />}
            />
          )}

          {recruiter && <Route index element={<AllOpportunities />} />}

          {recruiter && <Route path="profile" element={<RecruiterProfile />} />}
          {recruiter && <Route path="add-job" element={<PostJob />} />}
          {/* {recruiter && (
            <Route path="all-jobs" element={<AllOpportunities />} />
          )} */}
          {recruiter && (
            <Route
              path="opportunity-details"
              element={<OpportunityDetails />}
            />
          )}
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/register-user" element={<Register />} />
        <Route path="/register-recruiter" element={<RegisterRecruiter />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
