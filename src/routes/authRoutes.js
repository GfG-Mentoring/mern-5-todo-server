const { Router } = require('express');
const { z } = require('zod');
const fs = require('fs');
const {
  createPasswordHash,
  comparePasswords,
} = require('../utils/passwordManager');
const { createJWT } = require('../utils/jwtManager');
const { Users } = require('../models/user.model');

const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  try {
    //   validation
    const validator = z.object({
      email: z.string().email({ message: 'Please provide valid email.' }),
      fullName: z.string().min(4),
      password: z.string().min(6),
    });
    validator.parse(req.body);

    // create the user;
    const hashedPassword = await createPasswordHash(req.body.password);

    const newUser = new Users();
    newUser.email = req.body.email;
    newUser.fullName = req.body.fullName;
    newUser.password = hashedPassword;

    await newUser.save();

    res.status(201).send({ message: 'User created' });
  } catch (err) {
    //     [
    //   {
    //     validation: 'email',
    //     code: 'invalid_string',
    //     message: 'Please provide valid email.',
    //     path: [ 'email' ]
    //   },
    //   {
    //     code: 'too_small',
    //     minimum: 6,
    //     type: 'string',
    //     inclusive: true,
    //     exact: false,
    //     message: 'String must contain at least 6 character(s)',
    //     path: [ 'password' ]
    //   }
    // ]

    const issues = err.issues;

    const formattedError = issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    res.status(400).send(formattedError);
  }
});

authRouter.post('/login', async (req, res) => {
  // validation of inputs

  // get users
  const user = await Users.findOne({ email: req.body.email });

  // check if user exist
  if (!user) {
    res
      .status(404)
      .send({ message: `User not found with email: ${req.body.email}` });
  }

  const doesPasswordsMatch = await comparePasswords(
    req.body.password,
    user.password
  );

  if (doesPasswordsMatch) {
    const accessToken = createJWT({
      email: user.email,
      fullName: user.fullName,
    });

    res.status(200).send({
      message: 'login successful',
      data: {
        email: user.email,
        fullName: user.fullName,
        accessToken,
      },
    });
  } else {
    res.status(400).send({ message: "Passwords don't match." });
  }
});

module.exports = { authRouter };
