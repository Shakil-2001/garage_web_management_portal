import { create } from 'zustand';

type User = {
    _id: string;
    firstName: string;
    surname: string;
    email: string;
    admin: boolean;
    role: string;
    jobs: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    emergencyContactName: string;
    emergencyContactNumber: number;
    password: string;
};

type Action = {
    updateUser: (userData: Partial<User>) => void;
};

// export const useUserStore = create<User & Action>((set) => ({
//     _id: '',
//     firstName: '',
//     surname: '',
//     email: '',
//     admin: false,
//     role: '',
//     jobs: [],
//     createdAt: '',
//     updatedAt: '',
//     __v: 0,
//     emergencyContactName: '',
//     emergencyContactNumber: 0,
//     password: '',

//     updateUser: (userData) =>
//         set((state) => ({
//             ...state,
//             ...userData,
//         })),
// }));

export const useUserStore = create<User & Action>((set) => {
    const storedUser = localStorage.getItem('user');
    
    const initialState = storedUser ? JSON.parse(storedUser) : {
      _id: '',
      firstName: '',
      surname: '',
      email: '',
      number: '',
      admin: false,
      role: '',
      jobs: [],
      createdAt: '',
      updatedAt: '',
      __v: 0,
      emergencyContactName: '',
      emergencyContactNumber: 0,
      password: '',
    };
  
    return {
      ...initialState,
      updateUser: (userData) => {
        const updatedUser = { ...initialState, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        set(updatedUser);
      },
    };
  });