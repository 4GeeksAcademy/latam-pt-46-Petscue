import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { privateMenu } from "../services/privateMenu";

export const AllDashboard = () => {
  const [roleData, setRoleData] = useState(null);
  const navigate = useNavigate();

  const routePrivateForAll = async () => {
    try {
      const data = await privateMenu();

      if (data && data.user_data && data.user_data.role === `OWNER`) {
        setRoleData(data.user_data);
      } else if (data && data.user_data && data.user_data.role === `ADOPTER`) {
        setRoleData(data.user_data);
      } else if (data && data.user_data && data.user_data.role === `RESCUER`) {
        setRoleData(data.user_data);
      } else {
        console.warn(`User is not exist: `, data.user_data);
        navigate("/login");
      }
    } catch (error) {
      console.error("Ocurrio un error al acceder a la información, ", error);
    }
  };

  useEffect(() => {
    routePrivateForAll();
  }, []);

  return (
    <div className="dashboard-container container rounded-3 ">
      {roleData ? (
        <div className="row align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={roleData.profile_picture}
              alt="profile"
              className="img-fluid profile-img"
            
            />
          </div>
          <div className="col-md-7">
            <h2>
              Name:{" "}
              <span className="highlight-name">
                {roleData.first_name} {roleData.last_name}
              </span>
            </h2>
            <h4 className="role-title mt-3">Role: {roleData.role}</h4>
            <p className="lead">
              📞 <strong>Phone:</strong> {roleData.phone}
            </p>
            <p className="lead">
              📧 <strong>Email:</strong> {roleData.email}
            </p>
            {roleData.story && (
              <>
                <h5 className="mt-4">Story:</h5>
                <p>{roleData.story}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Cargando información del propietario...</p>
      )}
    </div>
  );
};
