import { useEffect, useState } from "react";
import ProfileForm from "./profileForm";
import classes from "./userProfile.module.css";
import { getSession } from "next-auth/client";

function UserProfile() {
  async function changePasswordHandler(passwordData: { oldPassword: string; newPassword: string }) {
    const response = await fetch("/api/user/changePassword", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();
    alert(data.message);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
