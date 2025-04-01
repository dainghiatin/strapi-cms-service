// Path: ./src/api/auth/controllers/auth.js

'use strict';

const { sanitize } = require('@strapi/utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (ctx) => {
  const { cccd, password } = ctx.request.body;

  if (!cccd || !password) {
    return ctx.badRequest('cccd and password are required');
  }
  console.log(ctx.request.body);

  let existingUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
    filters: {
      cccd: {
        $eqi: cccd,
      },
    },
  });




  if (existingUsers.length <= 0) {
    return ctx.unauthorized('Invalid credentials');
  }

  const validPassword = await verifyPassword(
    password,
    existingUsers[0].password
  );

  if (!validPassword) {
    return ctx.unauthorized('Invalid credentials');
  }

  console.log(existingUsers);


  const token = jwt.sign({ cccd: existingUsers[0].cccd, id: existingUsers[0].id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return ctx.send({ token, user: existingUsers[0] });


}

const verifyPassword = async (plainTextPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match; // Returns true if the passwords match, false otherwise
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false; // Or throw error, depending on your needs.
  }
}

const register = async (ctx) => {
  const { 
    username, 
    email, 
    password, 
    cccd, 
    reference_id, 
    full_name, 
    mobile_number, 
    bank_number, 
    bank_name, 
    address_no, 
    address_on_map 
  } = ctx.request.body;

  if (!password || !cccd) {
    return ctx.badRequest('Missing required fields');
  }

  try {
    const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        $or: [{ cccd: cccd }],
      },
    });

    if (existingUser) {
      if (existingUser.cccd === cccd) {
        return ctx.badRequest('CCCD already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await strapi.db.query('plugin::users-permissions.user').create({
      data: {
        username,
        email,
        password: hashedPassword,
        cccd,
        reference_id,
        full_name,
        mobile_number,
        bank_number,
        bank_name,
        address_no,
        address_on_map,
        confirmed: true, // or false if you need email confirmation
      },
    });


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    ctx.send({
      jwt: token,
      user: user,
    });

  } catch (err) {
    console.error("Registration Error", err);
    ctx.internalServerError('An error occurred during registration');
  }
}

const changePassword = async (ctx) => {
  const { cccd, current_password, new_password, confirm_password } = ctx.request.body;

  if (!cccd || !current_password || !new_password || !confirm_password) {
    return ctx.badRequest('All fields are required');
  }

  if (new_password !== confirm_password) {
    return ctx.badRequest('New password and confirm password do not match');
  }

  try {
    // Find user by CCCD
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { cccd: cccd },
    });

    if (!user) {
      return ctx.notFound('User not found');
    }

    // Verify current password
    const validPassword = await verifyPassword(current_password, user.password);
    if (!validPassword) {
      return ctx.unauthorized('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return ctx.send({ message: 'Password updated successfully' });
  } catch (err) {
    console.error("Password Change Error:", err);
    return ctx.internalServerError('An error occurred while changing password');
  }
}

const getMe = async (ctx) => {
  try {
    // Get the token from the Authorization header
    const token = ctx.request.header.authorization?.split(' ')[1];
    
    if (!token) {
      return ctx.unauthorized('No token provided');
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Find user by id from token
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { cccd: decoded.cccd },
    });

    if (!user) {
      return ctx.notFound('User not found');
    }

    // Remove sensitive information
    const { password, ...userWithoutPassword } = user;

    return ctx.send(userWithoutPassword);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return ctx.unauthorized('Invalid token');
    }
    console.error("Get User Details Error:", err);
    return ctx.internalServerError('An error occurred while fetching user details');
  }
}

const updateUser = async (ctx) => {
  try {
    // Get the token from the Authorization header
    const token = ctx.request.header.authorization?.split(' ')[1];
    
    if (!token) {
      return ctx.unauthorized('No token provided');
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by CCCD from token
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { cccd: decoded.cccd },
    });

    if (!user) {
      return ctx.notFound('User not found');
    }

    // Get update data from request body
    const updateData = ctx.request.body;
    
    // Remove sensitive fields that shouldn't be updated through this endpoint
    delete updateData.password;
    delete updateData.cccd;
    delete updateData.id;

    // Update user
    const updatedUser = await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: user.id },
      data: updateData,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return ctx.send(userWithoutPassword);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return ctx.unauthorized('Invalid token');
    }
    console.error("Update User Error:", err);
    return ctx.internalServerError('An error occurred while updating user details');
  }
}

module.exports = {
  login, register, changePassword, getMe, updateUser
};