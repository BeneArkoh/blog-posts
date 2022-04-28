import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/user.model";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Mona",
      credentials: {
        email: {
          label: "Email Adress",
          type: "email",
          placeholder: "john.doe@email.com",
          required: true,
        },
        password: {
          type: "password",
          label: "password",
          placeholder: "please enter your password",
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // checking if user is on the database
        let user = await User.findOne({ email });
        if (!user) {
          return null;
        }

        // checking if password match
        const ismatch = await bcrypt.compare(password, user, password);
        if (!ismatch) return null;

        return user;
      },
    }),
  ],
  callback: {
    jwt: ({ token, user }) => {
      if (token) {
        token.id = user._id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
  },
  session: ({ session, token }) => {
    if (session) {
      session.id = token.id;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
    }
    return session;
  },
  secret: "secret",
  jwt: {
    secret: "ThisIsMySecret",
    encrypt: true,
  },
});
