import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../../../libs/mongodb";
import Employee from "../../../../models/employee";
import bcrypt from "bcryptjs";



const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {

                const { email, password } = credentials; //

                try {
                    await await connectMongoDB(); 

                    const employee = await Employee.findOne({ email: email });

                    if (!employee) {
                        return null;
                    }

                    const matchingPassword = await bcrypt.compare(password, employee.password); //

                    if (!matchingPassword) {
                        return null;
                    }

                    return employee;
                } catch(error){
                    console.log(error);
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
    callbacks: {
        authorized({auth,request}){
            const isLoggedIn = auth?.Employee
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
            if(isOnDashboard){
                if(isLoggedIn) return true
                return false
            } else if(isLoggedIn){
                return Response.redirect(new URL("/dashboard", request.nextUrl))
            }
            return true;
        }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
