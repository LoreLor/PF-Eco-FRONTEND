export default function submitValidations(user) {
    let errors = {};
    if (!user.name) {
        errors.name = "First name is required";
      }
    if (!user.last_name) {
        errors.last_name = "Last name is required";
      }
      if (!user.user_name) {
        errors.user_name = "Username is required";
      }
      if (!user.email) {
        errors.email = "Email is required";
      }
      if (!user.password) {
        errors.password = "Password is required";
      }
    return errors
}