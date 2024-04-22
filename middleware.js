export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", 
                                "/dashboard/customer", 
                                "/dashboard/inventory", 
                                "/dashboard/invoice",
                                "/dashboard/job",
                                "/dashboard/taskboard",
                                "/dashboard/vehicle",
                                "/dashboard/employees"]};