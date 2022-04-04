// Import stylesheets
import './style.css';

// *********************************************
// Optional chaining
// *********************************************

//  The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist.

// The “non-existing property” problem
// ----------------------------------------

// Most of our users have addresses in user.address property, with the street user.address.street, but some did not provide them.

// In such case, when we attempt to get user.address.street, and the user happens to be without an address, we get an error:
let user = {}; // an empty object
console.log(user.address); //user[1]: undefined ->no error

//to avoid the error
console.log(user.address ? user.address.street : undefined); //undefined
console.log(user.address && user.address.street); //undefined ->better ?

// For more deeply nested properties,
console.log(
  user.address ? (user.address.street ? user.address.street.name : null) : null
); //null ->isn't it ugly ?

//Now the better way to write it, using the && operator,
console.log(user.address && user.address.street && user.address.street.name); //undefined;

// &&
// AND’ing(using &&) the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn’t ideal.

// Optional chaining
// ******************************************

// The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

// Something “exists” means if it’s not null and not undefined.

// In other words, value?.prop:
// i. -> works as value.prop, if value exists,
// ii. -> otherwise (when value is undefined/null) it returns undefined.

//Here’s the safe way to access user.address.street using ?.:
console.log(user?.address?.street); //undefined

// Reading the address with user?.address works even if user object doesn’t exist:
user = null;
console.log(user?.address); //undefined;
console.log(user?.address.street); //undefined;
// Please note: the ?. syntax makes optional the value before it, but not any further.
//E.g. in user?.address.street.name the ?. allows user to safely be null/undefined (and returns undefined in that case), but that’s only for user.
//Further properties are accessed in a regular way. If we want some of them to be optional, then we’ll need to replace more . with ?..
console.log(user?.address?.street); //undefined;

//Don’t overuse the optional chaining
// ------------------------------------------

//We should use ?. only where it’s ok that something doesn’t exist.
//For example, if according to our code logic user object must exist, but address is optional, then we should write user.address?.street, but not user?.address?.street.

//The variable before ?. must be declared
// -----------------------------------------------

// The optional chaining works only for declared variables.
// If there’s no variable myUser at all, then myUser?.anything triggers an error:
// console.log(myUser?.address); //Error: myUser is not defined

// Short-circuiting
// -------------------------------------

//the ?. immediately stops (“short-circuits”) the evaluation if the left part doesn’t exist.
// So, if there are any further function calls or operations to the right of ?., they won’t be made.
let myUser = null;
let x = 0;

myUser?.sayHi(x++); //if myUser exists, increment x;
console.log(`myUser: ${myUser} and x: ${x}`); //myUser: null and x: 0 -> x is not indremented.
let user1 = { name: 'Ami' };
user1.increment = function () {
  x += 10;
};
// x++;
user1?.increment?.();
console.log(x); //10 -> user1 exists so,

// Other variants: ?.(), ?.[]
// *****************************************

// The optional chaining ?. is not an operator, but a special syntax construct, that also works with functions and square brackets.
// For example, ?.() is used to call a function that may not exist.
user1?.increment?.();
console.log(x);   //20;
user1?.sayHi?.(); // nothing happens (no such method)
// Then ?.() checks the left part: if the increment function exists, then it runs (that’s so for increment). Otherwise (for sayHi) the evaluation stops without errors.
// The ?.[] syntax also works, if we’d like to use brackets [] to access properties instead of dot ..
console.log(user1?.['name']); //Ami

// Also we can use ?. with delete:
delete user1?.name;
console.log(user1.name);  //undefined, ->deleted?

// We can use ?. for safe reading and deleting, but not writing

// user1?.age = 30;  // Error: Invalid left-hand side in assignment
// because it evaluates to: undefined = 30


user = [
  {
    name: 'John',
    address: {
      street: '1113 South Fairfax Ave',
      city: 'Los Angeles',
      state: 'CA',
    },
    designation: 'admin',
  },
  {
    name: 'Shelly',
    designation: 'guest',
    sayHi() {
      console.log(`Hi, ${this.name}`);
    },
  },
];

console.log(user[0].name); // John
console.log(user[0].address?.street); // 1113 South Fairfax Ave

// console.log(user[1].address.street); // Cannot read property 'street' of undefined

console.log(user[1].address?.street); // undefined

console.log(user[0].address && user[0].address.state); // CA
console.log(user[1].address && user[1].address.state); // undefined

// ?.() is used to call a function that may not exist.
// console.log(user[0].sayHi()); // not a function
console.log(user[1].sayHi()); //Hi, Shelly

// Delete

// delete user[1].designation if user exists.
console.log(user[1]?.['designation']);  //guest
delete user[1]?.designation;
console.log('user[1]: ' + user[1].designation); // undefined ->deleted?
