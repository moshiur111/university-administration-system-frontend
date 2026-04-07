export type TOfferedCourse = {
  _id: string;
  semesterRegistration: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: string;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
