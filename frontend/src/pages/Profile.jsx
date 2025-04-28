import MainHeading from "../ui/MainHeading.jsx";
import UpdateForm from "../features/Authentication/UpdateProfile.jsx";

function Profile() {
  return (
    <>
      <MainHeading content={"Profile"} />
      <UpdateForm />
    </>
  );
}

export default Profile;
