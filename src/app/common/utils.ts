//required error validations
export const inputRequiredValidations = (form: any, type: any): boolean => {
  return (
    (form.get(type).touched || form.get(type).dirty) &&
    form.get(type).errors !== null &&
    form.get(type).errors.required
  );
};

//pattern validation
export function PatternValidations(form: any, type: string): boolean {
  return (
    (form.get(type)?.touched || form.get(type)?.dirty) &&
    form.get(type)?.errors !== null &&
    form.get(type)?.errors.pattern
  );
}
// minlength phoneNumber  validation
export function minLengthValidations(form: any, type: string): any {
  return (
    (form.get(type).touched || form.get(type).dirty) &&
    form.get(type).errors !== null &&
    form.get(type)?.errors.minlength
  );
}
// minValue validation
export function minValueValidations(form: any, type: string): any {
  return (
    (form.get(type).touched || form.get(type).dirty) &&
    form.get(type).errors !== null &&
    form.get(type).value <= 0
  );
}
// Confirm Password Checking Validation
export function confirmPasswordValidation(
  form,
  password: string,
  confirmpassword: string
): boolean {
  return (
    (form.get(confirmpassword).touched || form.get(confirmpassword).dirty) &&
    form.get(password)?.value !== form.get(confirmpassword)?.value
  );
}
// same password checking Validation
export function samePasswordValidation(
  form,
  oldpassword: string,
  newpassword: string
): boolean {
  return (
    (form.get(newpassword).touched || form.get(newpassword).dirty) &&
    form.get(oldpassword)?.value === form.get(newpassword)?.value
  );
}
