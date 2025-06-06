// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { CreateUser } from "./pages/RegisterUser";
import { AllDashboard } from "./pages/privatePageForAll";
import { Profile } from "./pages/Profile";
import { ProfileLayout } from "./pages/ProfileLayout";
import { NewAnimalForm } from "./pages/NewAnimalForm";
import { Favorites } from "./pages/Favorites";
import { PrivateRoute } from "./components/PrivateRoute";
import { Inicio } from "./pages/Inicio";
import { PetProfile } from "./pages/PetProfile";
import { NotificationsView } from "./pages/NotificationsView";
import { EditAnimalForm } from "./pages/EditAnimalForm";
import { SentMessages } from "./pages/SentMesages"
import { AboutUs } from "./pages/AboutUs";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateUser />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<AllDashboard />} />
          <Route path="profileanimal" element={<Profile />} />
          <Route path="newanimal" element={<NewAnimalForm />} />
          <Route path="notifications" element={<NotificationsView />} />
          <Route path="edit/:id" element={<EditAnimalForm />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="sent-messages" element={<SentMessages />} />
        </Route>
      </Route>
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/pet/:id" element={<PetProfile />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Route>
  )
);
