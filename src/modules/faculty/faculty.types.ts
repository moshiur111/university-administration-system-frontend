export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TFaculty = {
  _id: string;
  id: string;
  user: string;
  name: TFacultyName;
  fullName: string;
  designation: string;
  gender: "male" | "female";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
