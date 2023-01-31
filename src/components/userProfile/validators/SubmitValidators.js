export  function submitA(user) {
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
      if (!user.birthday) {
        errors.birthday = "Date is required";
      }
    return errors
}

export function submitB(user) {
  let errors = {};
    if (!user.prev_password) {
      errors.prev_password = "Actual password is required";
    }
    if (!user.new_password) {
      errors.new_password = "New password is required";
    }    if (!user.conf_password) {
      errors.conf_password = "Must confirm new password";
    }
    if(user.prev_password === user.new_password){
      errors.new_password = "Can't be the same password"
    }
  return errors
}

export function submitC(user) {
  let errors = {};
    if (!user.address) {
      errors.address = "Address is required";
    }
    if (!user.phone_number) {
      errors.phone_number = "Phone number is required";
    }
  return errors
}

