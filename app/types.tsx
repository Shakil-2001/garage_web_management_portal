export type SidebarItem = {
    title: String;
    path: String;
    icon?: JSX.Element;
    admin: Boolean;
}

export type CustomerType = {
    _id: String;
    vehicles: [String];
    jobs: [String];
    firstName: String;
    surname: String;
    number: String;
    email: String;
    address: String;
    postcode: String;

}