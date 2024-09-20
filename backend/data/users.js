import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'J.K. Royston',
    email: 'jk@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    name: 'Lou Keeton',
    email: 'lou@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  }
];

export default users;