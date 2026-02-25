/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  const error = {};

  const name = formData?.name?.trim() ?? "";
  if(typeof name !== "string" || name.length<2 || name.length >50){
    error.name = "Name must be 2-50 characters";
  };
  
  const email = formData?.email?.trim() ?? "";
  if(typeof email !== "string"){
    error.email = "Invalid email format";
  }else{
    const index = email.indexOf("@");
    const lIndex = email.lastIndexOf("@");
    const dotIndex = email.indexOf(".",index+1);

    if(index !== lIndex || dotIndex === -1 || index === -1){
      error.email = "Invalid email format";
    }
  }

  const phone = formData?.phone?.trim() ?? "";
  if(typeof phone !== "string" || phone.length !== 10 ){
    error.phone = "Invalid Indian phone number";
  }else{
    const validStart = ["6","7","8","9"].includes(phone[0]);
    let allDegit = true;
    for(let i=0; i<phone.length; i++){
      if(phone[i] < "0" || phone[i] > "9"){
        allDegit = false;
        break;
      }
    }
    if(!validStart || !allDegit){
      error.phone = "Invalid Indian phone number";
    }
  }

  let age = formData?.age;
  if(typeof age === "string"){
    age = parseInt(age,10);
  }
  if(typeof age !== "number"|| isNaN(age) || age<16 || age>100 || !Number.isInteger(age)){
    error.age = "Age must be an integer between 16 and 100";
  }

  let pincode = formData?.pincode;
  if (
    typeof pincode !== "string" ||
    pincode.length !== 6 ||
    pincode.startsWith("0")
  ) {
    error.pincode = "Invalid Indian pincode";
  } else {
    for (let i = 0; i < pincode.length; i++) {
      if (pincode[i] < "0" || pincode[i] > "9") {
        error.pincode = "Invalid Indian pincode";
        break;
      }
    }
  }

  const state = formData?.state?.trim() ?? "";
  if(state.length === 0){
    error.state = "State is required";
  }

  const agreeTerms = formData?.agreeTerms;
  if (!Boolean(agreeTerms)) {
    error.agreeTerms = "Must agree to terms";
  }
  
  let isValid = false;
  if(error.length === 0){
    isValid = true;
    return { isValid: isValid, errors: {error} };
  }

  return {
    isValid: Object.keys(error).length === 0,
    errors: error,
  };
}
