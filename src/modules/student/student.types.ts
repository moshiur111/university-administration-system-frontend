// student.interface.ts

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  role: string;
  needsPasswordChange: boolean;
  status: "in-progress" | "active" | "blocked";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth?: string;
  email: string;
  profileImg?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  __v?: number;
};

export type TCreateStudentPayload = {
  password: string;
  student: TStudent;
  file?: File;
};
