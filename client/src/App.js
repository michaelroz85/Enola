import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import Welcome from "./pages/welocme-page/WelcomePage";
import CreateFamilyPage from "./pages/create-family-page/CreateFamilyPage";
import Families from "./pages/families-page/FamiliesPage";
import CreateTask from "./pages/create-task-page/CreateTaskPage";
import Volunteers from "./pages/volunteers-page/VolunteersPage";
import Tasks from "./pages/tasks-page/TasksPage";
import Family from "./pages/families-page/singleFamilyPage"
import ProfilePage from "./pages/profile-page/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create-family">
            <Route index element={<CreateFamilyPage />} />
            <Route path=":id" element={<CreateFamilyPage />} />
          </Route>
          <Route path="/create-task/:id" element={<CreateTask />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tasks/tasks-for-family/:family_id" element={<Tasks />} />
          <Route path="/families" element={<Families />} />
          <Route path="/families/:family_id" element={<Family />} />
          <Route
            path="/families/volunteers/:family_id/:name"
            element={<Volunteers />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  )

  // return (
  //    <Route path=":id" element={<CreateFamily />} />

  //   <ThemeProvider theme={theme}>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/create-family">
  //           <Route index element={<CreateFamily />} />
  //           <Route path=":id" element={<CreateFamily />} />
  //         </Route>
  //         <Route path="/" element={<Welcome />} />
  //         <Route path="/families" element={<Families />} />
  //         <Route path="/create-task/:id" element={<CreateTask />} />
  //         <Route path="/tasks/:family_id" element={<Tasks />} />
  //         <Route
  //           path="/families/volunteers/:family_id/:name"
  //           element={<Volunteers />}
  //         />
  //       </Routes>
  //     </BrowserRouter>
  //   </ThemeProvider>
  // );
};
export default App;
