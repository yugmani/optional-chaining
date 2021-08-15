// Import stylesheets
import './style.css';

// Optional chaining

//  The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist.

// example
// Most of our users have addresses in user.address property, with the street user.address.street, but some did not provide them.

// In such case, when we attempt to get user.address.street, and the user happens to be without an address, we get an error:

// The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

const user = [
  {
    name: 'John',
    address: {
      street: '1113 South Fairfax Ave',
      city: 'Los Angeles',
      state: 'CA'
    },
    designation: 'admin'
  },
  {
    name: 'Shelly',
    designation: 'guest'
  }
];

console.log(user[0].name); // John
console.log(user[0].address?.street); // 1113 South Fairfax Ave

// console.log(user[1].address.street); // Cannot read property 'street' of undefined

console.log(user[1].address?.street); // undefined

console.log(user[0].address && user[0].address.state); // CA
console.log(user[1].address && user[1].address.state); // undefined

// Delete

// delete user[1].designation if user exists.
delete user[1].designation;
console.log('user[1]: ' + user[1].designation); // undefined
