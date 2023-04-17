import { FormEvent, useRef } from "react";
import classes from "./profileForm.module.css";

function ProfileForm({ onChangePassword }: { onChangePassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }): void }) {
  const oldPassword = useRef<HTMLInputElement>(null);
  const newPassword = useRef<HTMLInputElement>(null);

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const enteredOldPassword = oldPassword.current?.value;
    const enteredNewPassword = newPassword.current?.value;

    if (!enteredNewPassword || !enteredOldPassword) return;

    onChangePassword({ oldPassword: enteredOldPassword, newPassword: enteredNewPassword });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassword} required />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPassword} required />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
